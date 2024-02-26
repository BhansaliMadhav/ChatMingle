import express from "express";
import { SearchResult, CreateChatKey,chatSearch } from "../Controllers/searchController.js";
const router = express.Router();
router.post("/userId", SearchResult);
router.post("/createUserAndChat", CreateChatKey );
router.get("/chats",chatSearch);
export default router;
