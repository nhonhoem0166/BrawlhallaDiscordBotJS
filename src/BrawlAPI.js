const axios = require("axios");
require("dotenv").config();
class BrawlAPI {
  static backetList = ["1v1", "2v2"];
  static regionList = ["us-e", "eu", "sea", "brz", "aus", "us-w", "jpn"];
  static dataLegends = [];
  static async Init() {
     await this.UpdateStaticData();
  }
  static async UpdateStaticData()
  {
    this.dataLegends = await this.GetAllLegend();
    console.log(this.dataLegends);
  }
  static async GetLeaderBoard(backet, region, page) {
    if (!this.backetList.includes(backet)) {
      console.log(`Backet ${backet} not found`);
      return false;
    }
    if (!this.regionList.includes(region)) {
      console.log(`Region ${region} not found`);
      return false;
    }
    if (page <= 0) {
      console.log("Page must be greater than 0");
      return false;
    }
    return await this.DownloadData(`rankings/${backet}/${region}/${page}`);
  }
  static async GetBHIDFromName(name) {
    var dataArr = this.GetPlayerByName(name);
    if (dataArr || !dataArr[0]) return false;
    dataArr.filter(
      (p) =>
        decodeURIComponent(escape(p.name)).toLowerCase() == name.toLowerCase()
    );
    return dataArr[0].brawlhalla_id;
  }
  static async GetClanByID(clan_id) {
    return await this.DownloadData(`clan/${clan_id}`);
  }
  static async GetPlayerStatsByID(brawlhalla_id) {
    return await this.DownloadData(`player/${brawlhalla_id}/stats`);
  }
  static async GetStatsByName(name) {
    var player = this.GetBHIDFromName(name);
    if (player) return this.GetPlayerStatsByID(player.brawlhalla_id);
  }
  static async GetPlayerRankedByID(brawlhalla_id) {
    return await this.DownloadData(`player/${brawlhalla_id}/ranked`);
  }
  static async GetPlayersByName(name) {
    return await this.DownloadData(`rankings/1v1/all/1&name=${name}`);
  }
  static async GetAllLegend() {
    return await this.DownloadData(`legend/all`);
  }
  static GetLegendName(legend_id) {
    if (this.dataLegends.length == 0) {
      console.log("dataLegend null");
      return false;
    }
    return this.dataLegends.find((x) => x.legend_id == legend_id).bio_name;
  }
  static async GetLegendInfo(legend_id) {
    return await this.DownloadData(`legend/${legend_id}`);
  }
  static async gloryFromWins(totalwins) {
    if (totalwins <= 150) return 20 * totalwins;

    return Math.floor(10 * (45 * Math.pow(Math.log10(totalwins * 2), 2)) + 245);
  }

  static async gloryFromBestRating(bestrating) {
    let retval = 0;

    if (bestrating < 1200) retval = 250;

    if (bestrating >= 1200 && bestrating < 1286)
      retval = 10 * (25 + 0.872093023 * (86 - (1286 - bestrating)));

    if (bestrating >= 1286 && bestrating < 1390)
      retval = 10 * (100 + 0.721153846 * (104 - (1390 - bestrating)));

    if (bestrating >= 1390 && bestrating < 1680)
      retval = 10 * (187 + 0.389655172 * (290 - (1680 - bestrating)));

    if (bestrating >= 1680 && bestrating < 2000)
      retval = 10 * (300 + 0.428125 * (320 - (2000 - bestrating)));

    if (bestrating >= 2000 && bestrating < 2300)
      retval = 10 * (437 + 0.143333333 * (300 - (2300 - bestrating)));

    if (bestrating >= 2300)
      retval = 10 * (480 + 0.05 * (400 - (2700 - bestrating)));

    return Math.floor(retval);
  }
  static async newEloFromOldElo(elo) {
    if (elo >= 1400)
      return Math.floor(1400 + (elo - 1400) / (3 - (3000 - elo) / 800));

    return elo;
  }

  static async DownloadData(uri) {
    console.log(uri);
    uri += `&api_key=${process.env.BrawlAPIKey}`;
    var uriFormat = `https://api.brawlhalla.com/${uri}`;

    try {
      //auto parse json to object
      const response = await axios(uriFormat);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
module.exports = {
  BrawlAPI: BrawlAPI,
};
