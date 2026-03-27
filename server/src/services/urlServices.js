import Url from "../models/url.js";

async function createShortUrls(longUrl, shortCode){
   const url = await Url.create({
      originalUrl: longUrl,
      shortCode: shortCode,
   });

   return url.shortCode;
}

export default createShortUrls;