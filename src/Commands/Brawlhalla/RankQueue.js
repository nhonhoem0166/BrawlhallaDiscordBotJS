const { BrawlAPI } = require("../../BrawlAPI.js");
const { EmbedBuilder } = require("discord.js");
const boardQueue = [];
const messageBoardRanks = [];
function GetMinuteBySubDate(firstDate, secondDate) {
  return Math.abs(firstDate - secondDate) / (1000 * 60);
}
function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function GetQueue(oldRank, updateRank) {
  var queueList = [];
  if (!oldRank || !updateRank) return queueList;

  for (const playerNew of updateRank) {
    var playerOld = oldRank.find(
      (x) => x.brawlhalla_id == playerNew.brawlhalla_id
    );
    if (!playerOld) continue;
    if (playerOld.games != playerNew.games) {
      playerNew.rankChange = playerNew.rank - playerOld.rank;
      playerNew.ratingChange = playerNew.rating - playerOld.rating;
      playerNew.gamesChange = playerNew.games - playerOld.games;
      queueList.push(playerNew);
    }
  }
  return queueList;
}
function Truncate(value, maxChars) {
  return value.length <= maxChars
    ? value
    : value.substring(0, maxChars) + "...";
}
function GetEmojiRank(elo) {
  if (elo >= 2000) {
    return "<:1dia:725590159155920947>";
  } else if (elo > 1622) {
    return "<:2plat:725590158333706242>";
  } else if (elo >= 1338) {
    return "<:3Gold:725590158182842409>";
  } else if (elo >= 1086) {
    return "<:4Silver:725590158556135465>";
  } else if (elo >= 872) {
    return "<:5Bronze:725590158577106954>";
  } else if (elo >= 200) {
    return "<:6Tin:725590158224654358>";
  }
  return "";
}
function GetPlayerFormat(player) {
  var stringBuiler = [];
  stringBuiler.push(
    `Hạng:**${player.rank}** ${
      player.rankChange == 0
        ? ""
        : `*(${
            player.rankChange > 0
              ? `:small_red_triangle_down:${player.rankChange}`
              : `<:arrowup:931146550674083861>${Math.abs(player.rankChange)}`
          })*`
    } [**Xem**](${"http://corehalla.com/stats/player/" + player.brawlhalla_id})`
  );
  stringBuiler.push(
    `ELo: **${player.rating}/${player.peak_rating}** ${
      player.ratingChange == 0
        ? ""
        : `*(${
            player.ratingChange > 0
              ? `+${player.ratingChange}`
              : `${player.ratingChange}`
          })*`
    } `
  );
  stringBuiler.push(
    `Thắng/Thua: \n**${player.wins}/${player.games - player.wins}** (*${(
      (player.wins / player.games) *
      100.0
    ).toFixed(1)}%*)`
  );

  stringBuiler.push(
    `Best legend: **${BrawlAPI.GetLegendName(player.best_legend)}**`
  );
  stringBuiler.push(
    `Cập nhật **${GetMinuteBySubDate(new Date(), player.lastUpdate).toFixed(
      0
    )} phút trước**`
  );
  return stringBuiler.join("\n");
}
async function UpdateEmbedsQueue(queueEmbeds, channel) {
  Debug(`builders.Count = ${queueEmbeds.length}`);
  for (var i = 0; i < queueEmbeds.length; i++) {
    Debug(`Builders index ${i}`);
    Debug(`messageBoardRanks.Count = ${messageBoardRanks.length}`);
    if (i < messageBoardRanks.length) {
      await messageBoardRanks[i].edit({ embeds: [queueEmbeds[i]] });
    } else {
      var message = await channel.send({ embeds: [queueEmbeds[i]] });
      messageBoardRanks.push(message);
    }
    Debug(`Builders ${i} done`);
    if (i == queueEmbeds.length - 1) {
      i++;
      for (; i < messageBoardRanks.length; i++) {
        if (i == 0) {
          continue;
        }
        await messageBoardRanks[i].delete();
        messageBoardRanks.splice(i, 1);
      }
    }
  }
}
function Debug(msg) {
  if (process.env.debug) {
    Debug(`Rank Queue${msg}`);
  }
}
module.exports = {
  data: {
    name: "rankqueue",
    admin: true,
  },
  async execute(msg, client) {
    if (msg.author.id != process.env.admin) return;
    await msg.delete();
    var timeDelay = 4 * (60 * 1000);
    var timeRemove = 30;
    var maxPage = 20;
    var oldRank = [];

    while (true) {
      var updateRank = [];
      //update queue board
      for (var page = 1; page <= maxPage; page++) {
        Debug(`update board page ${page}`);
        var dataArr = await BrawlAPI.GetLeaderBoard("1v1", "sea", page);
        //Debug(dataArr);
        Debug(`update board page ${page} ${dataArr ? "done" : "fail"}`);
        if (!dataArr) {
          continue;
        }
        updateRank = updateRank.concat(dataArr);
      }
      console.log("updateRank cout: " + updateRank.length);
      //clear dupes
      updateRank = [...new Set(updateRank)];
      var newQueueList = await GetQueue(oldRank, updateRank);
      oldRank = updateRank;

      if (newQueueList.length > 0) {
        Debug("Đang xử lý dữ liệu");
        for (const newPlayer of newQueueList) {
          newPlayer.lastUpdate = new Date();
          //fix check
          var oldPlayerIndex = false;
          if (boardQueue.length > 0) {
            oldPlayerIndex = boardQueue.find(
              (x) => x.brawlhalla_id == newPlayer.brawlhalla_id
            );
          }

          if (oldPlayerIndex) {
            boardQueue[oldPlayerIndex] = newPlayer;
          } else {
            boardQueue.push(newPlayer);
          }
        }
      
      boardQueue = boardQueue.filter(
        (x) =>
          GetMinuteBySubDate(new Date(), x.lastUpdate).toFixed(0) < timeRemove
      );
      boardQueue = boardQueue.sort((a, b) => {
        return a.rank - b.rank;
      });
      Debug("Đang thêm thông tin người chơi vào Board");

      var countLimit = 0;
      var embeds = [];

      var builder = new EmbedBuilder();
      builder.setTitle("Brawlhalla SEA 1v1 Queue");
      builder.setDescription(
        `Hiển thị những người chơi trong top 1000 SEA đánh rank 1v1 trong ${timeRemove} phút gần đây hiện tại có ${boardQueue.length} người`
      );
      console.log(`Người chơi đang rank ${boardQueue.length}`);

      for (var i = 0; i < boardQueue.length; i++) {
        Debug(`Field ${i}`);
        var player = boardQueue[i];
        builder.addFields({
          name: GetEmojiRank(player.rating) + Truncate(player.name, 13),
          value: GetPlayerFormat(player),
          inline: true,
        });
        countLimit++;
        if (countLimit == 18 || i == boardQueue.length - 1) {
          Debug("Add builders");
          builder.setTimestamp();
          Debug("Add builders 1");
          embeds.push(builder);
          Debug("Add builder 2");
          builder = new EmbedBuilder();
          countLimit = 0;
        }
      }
    }
    try{
      await UpdateEmbedsQueue(embeds, msg.channel);
    }
    catch{}
      

      console.log("sleeping");
      await Sleep(timeDelay);
    }
  },
};
