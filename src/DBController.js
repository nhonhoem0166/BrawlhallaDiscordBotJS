const { MongoClient, ReturnDocument } = require("mongodb");
const { BrawlAPI } = require("./BrawlAPI");

require("dotenv").config();

const client = new MongoClient(process.env.DBConnect);
const discordDB = client.db("DiscordBot");
const colLink = discordDB.collection("Link");
class DBController {
  static async GetLinkByDiscordID(discord_id) {
    return await colLink.findOne({ discord_id, discord_id });
  }
  static async AddLink(brawlhalla_id, discord_id) {
    if (brawlhalla_id == 0 || discord_id == 0) {
      return "brawlhalla_id = 0";
    }
    var brawler = await colLink.findOne({
      discord_id: discord_id,
    });
    if (brawler) {
      return `Tài khoản của bạn đã được liên kết với **Brawlhalla ID:** ${brawler.brawlhalla_id} **Tên:** ${brawler.name} **Khu vực:** ${brawler.region} trước đó.\n`;
    }

    brawler = await BrawlAPI.GetPlayerRankedByID(brawlhalla_id);
    if (!brawler.rating) {
      return "Không tìm thấy người chơi vui lòng kiểm tra lại ID, nếu chưa chơi trận rank nào mùa này thì hãy chơi 1 trận rồi đợi 5 phút thử lại";
    }
    var doc = {
      name: brawler.name,
      region: brawler.region,
      rating: Number(brawler.rating),
      peak_rating: Number(brawler.peak_rating),
      discord_id: discord_id,
      brawlhalla_id: Number(brawlhalla_id),
      lastSynced: Number(new Date().getTime()),
    };
    var result = await colLink.insertOne(doc);
    console.log(result);
    if (result)
      return `<@${discord_id}>Tài khoản của bạn đã liên kết thành công với **Brawlhalla ID:** ${brawlhalla_id} **Tên:** ${brawler.name} **Khu vực:** ${brawler.region}`;
    return "Có lỗi xảy ra @@";
  }
  static async UpdateLink(discord_id, doc) {
    if (!discord_id) return false;
    const filter = { discord_id: discord_id };
    return await colLink.updateOne(filter, doc);
  }
  static async ReplaceLink(discord_id, doc) {
    if (!discord_id) return false;
    const filter = { discord_id: discord_id };
    return await colLink.replaceOne(filter, doc);
  }
  static async DeleteLink(discord_id) {
    var result = await colLink.deleteOne({ discord_id: discord_id });
    if (result.deletedCount > 0) {
      return "Hủy liên kết thành công";
    }
    return "Tài khoản của bạn chưa được liên kết";
  }
}
module.exports = DBController;
