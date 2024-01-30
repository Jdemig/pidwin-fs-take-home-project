import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import coinToss from './user-coin-toss.js';
import auth from "../utils/auth.js";
import getUser from "./user-get.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/change-password", auth, changePassword);
router.post('/coin-toss', auth, coinToss);
router.get('/user-get', auth, getUser);

export default router;
