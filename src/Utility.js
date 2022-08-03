const axios = require("axios");
class Utility {
  static async DownloadData(url) {
    try {
      //auto parse json to object
      const response = await axios.get(url, {
        transformResponse: (data) => {
          try {
            data = decodeURIComponent(this.Escape(data));
          } catch {}
          return JSON.parse(data);
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
    return str.replaceAll("\\u00", "%");
  }
  static Truncate(value, maxChars) {
    return value.length <= maxChars
      ? value
      : value.substring(0, maxChars) + "...";
  }
  static GetMinuteBySubDate(firstDate, secondDate) {
    return Math.abs(firstDate - secondDate) / (1000 * 60);
  }
  static SleepSync(ms)
  {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  static GetMillisecondFromMinute(minute)
  {
    return minute * 60 * 1000;
  }
}
module.exports = Utility;
