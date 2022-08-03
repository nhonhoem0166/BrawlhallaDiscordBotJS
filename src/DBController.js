const { MongoClient, ReturnDocument } = require("mongodb");
const { BrawlAPI } = require("./BrawlAPI");

require("dotenv").config();

const client = new MongoClient(process.env.DBConnect);
const discordDB = client.db("DiscordBot");
const colLinkAccout = discordDB.collection("LinkAccout");
class DBController {
  static async AddDiscordLink(brawlID, discordID) {
    if (brawlID == 0 || discordID == 0) {
      return "brawlID = 0";
    }
    var brawler = await colLinkAccout.findOne({
      discordID: discordID,
    });
    if (brawler) {
      return `Tài khoản của bạn đã được liên kết với **Brawlhalla ID:** ${brawler.brawlID} **Tên:** ${brawler.name} **Khu vực:** ${brawler.region} trước đó.\n`;
    }

    brawler = await BrawlAPI.GetPlayerRankedByID(brawlID);
    if (!brawler.rating) {
      return "Không tìm thấy người chơi vui lòng kiểm tra lại ID, nếu chưa chơi trận rank nào mùa này thì hãy chơi 1 trận rồi đợi 5 phút thử lại";
    }
    var doc = {
      name: brawler.name,
      region: brawler.region,
      elo: Number(brawler.rating),
      peakElo: Number(brawler.peak_rating),
      discordID: discordID,
      brawlID: Number(brawlID),
      lastUpdate: Number(new Date().getTime()),
    };
    var result = await colLinkAccout.insertOne(doc);
    console.log(result);
    if (result)
      return `<@${discordID}>Tài khoản của bạn đã liên kết thành công với **Brawlhalla ID:** ${brawlID} **Tên:** ${brawler.name} **Khu vực:** ${brawler.region}`;
    return "Có lỗi xảy ra @@";
  }
  static async ReplaceDiscordLink(doc) {
    if (!doc.brawlID) return false;
    const filter = { brawlID: doc.brawlID };
    console.log(`Update Player ${doc.brawlID}`);
    return await colLinkAccout.replaceOne(filter, doc);
  }
  static async DeleteDiscordLink(DiscordID) {
    var result = await colLinkAccout.deleteOne({ discordID: DiscordID });
    if (result.deletedCount > 0) {
      return "Hủy liên kết thành công";
    }
    return "Tài khoản của bạn chưa được liên kết";
  }
}
module.exports = DBController;
