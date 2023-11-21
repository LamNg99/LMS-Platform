import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfileImage,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser, isAuthenticated, authorizeRoles("admin"));
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfileImage);
userRouter.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
