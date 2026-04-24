import express from "express";
import { createEditShop } from "../controllers/shop.controller.js";
import { getMyShop } from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multer.js";


const shopRouter = express.Router();


shopRouter.post("/create-edit",isAuth,upload.single("img"), createEditShop);
shopRouter.get("/get-shop",isAuth, getMyShop);



export default shopRouter;