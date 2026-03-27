import Url from "../models/url.js";
async function getAllUrls(req, res) {
  try {
    const urls = await Url.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
}

export default getAllUrls;