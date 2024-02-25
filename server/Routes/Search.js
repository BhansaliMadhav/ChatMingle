import express from "express";
import { SearchResult, CreateChatKey } from "../Controllers/searchController.js";
const router = express.Router();
router.post("/userId", SearchResult);
router.post("/createUserAndChat", CreateChatKey );
export default router;
