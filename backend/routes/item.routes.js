import express from "express";
import { createEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth.js";
import { addItem,editItem } from "../controllers/item.controller.js";
import {upload} from "../utils/multer.js";


const itemRouter = express.Router();


itemRouter.post("/add-item",isAuth,upload.single("img"), addItem);
itemRouter.post("/edit-item/:id",isAuth,upload.single("img"), editItem);



export default itemRouter;