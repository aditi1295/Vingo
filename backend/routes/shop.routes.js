import express from "express";
import { createEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth.js";
import {upload} from "../utils/multer.js";


const shopRouter = express.Router();


shopRouter.get("/create-edit",isAuth,upload.single("img"), createEditShop);



export default shopRouter;