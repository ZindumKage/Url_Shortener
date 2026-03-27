import express from 'express';
import redirect from "../controllers/redirectControllers.js"
import rateLimiter from "../middleware/rateLimiter.js";
import  shorten  from '../controllers/urlControllers.js';
import getAnalytics from '../controllers/analyticsController.js';
import getAllUrls from '../controllers/getallUrls.js';
import status from '../controllers/statusController.js';

const router = express.Router();

router.post("/shorten",rateLimiter, shorten)
router.get("/urls", getAllUrls);
router.get("/status", status);
router.get("/analytics/:code", rateLimiter, getAnalytics )
router.get("/:code", rateLimiter, redirect);
export default router;