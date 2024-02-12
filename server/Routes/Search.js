import express from "express";
import { SearchResult } from "../Controllers/searchController.js";
const router = express.Router();
router.post("/userId", SearchResult);
export default router;
