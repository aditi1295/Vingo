import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addItem,editItem } from "../controllers/item.controller.js";
import {upload} from "../middlewares/multer.js";


const itemRouter = express.Router();


itemRouter.post("/add-item",isAuth,upload.single("img"), addItem);
itemRouter.post("/edit-item/:id",isAuth,upload.single("img"), editItem);



export default itemRouter;