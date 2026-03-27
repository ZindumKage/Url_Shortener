import Url from "../models/url.js";
import { nanoid } from "nanoid";


async function shorten(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }

   
    try {
      new URL(longUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const existing = await Url.findOne({
      where: {originalUrl: longUrl }
    });

if (existing && existing.shortCode) {
  return res.json({
    shortUrl: `http://localhost:2000/${existing.shortCode}`,
  });
}
     
    const shortCode = nanoid(5);

    await Url.create({
      originalUrl: longUrl,
      shortCode: shortCode,  
    });

    res.json({
      shortUrl: `http://localhost:2000/${shortCode}`,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({error: "server error"});
  }
}

export default shorten;