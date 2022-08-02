const axios = require("axios");
class Utility {
  static async DownloadData(url) {
    try {
      //auto parse json to object
      const response = await axios.get(url, {
        transformResponse: (data) => {
          return decodeURIComponent(this.Escape(data));
        },
        responseType: "json",
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static Escape(str) {
    return str.replaceAll("\\u00","%");
  }
  static Truncate(value, maxChars) {
    return value.length <= maxChars
      ? value
      : value.substring(0, maxChars) + "...";
  }
}
module.exports = Utility;
