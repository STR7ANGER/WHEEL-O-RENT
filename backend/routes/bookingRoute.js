import { addBooking, getBooking } from "../controllers/bookingController.js";
import authUser from "../middleware/userAuth.js";

import express from "express";

const bookingRouter = express.Router();

bookingRouter.post("/add",authUser ,addBooking);
bookingRouter.post("/get", authUser,getBooking);

export default bookingRouter;
