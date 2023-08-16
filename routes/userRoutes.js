import express from "express";
import {
  register,
  login,
  logout,
  allusers,
  deleteUser,
  singleUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/allusers").get(allusers);
router.route("/singleuser").get(singleUser);
router.route("/updateuser").put(updateUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/deleteuser").delete(deleteUser);

export default router;
