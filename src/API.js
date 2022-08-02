const Utility = require("./Utility");
class API{
    static async Translate(text)
    {
        var apiURI = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=";
        var urlFormat = apiURI+ encodeURIComponent(text);
        var data =  await Utility.DownloadData(urlFormat);
        return data[0][0][0];
    }
}
module.exports = API;