import express from "express"
import usersController from "../controllers/users/export"
import postController from "../controllers/posts/export"
import upload from "../config/multer"
import authMiddleware from "../middlewares/auth"
import roleMiddleware from "../middlewares/permission"
import { Role } from "@prisma/client"
import commentsController from "../controllers/comments/export"
const Router = express.Router()
// users routes
Router.post(
  "/auth/register",
  upload.single("imageUrl"),
  usersController.register
)
Router.post("/auth/login", usersController.login)
Router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware(Role.admin),
  upload.single("imageUrl"),
  usersController.edit_user
)
Router.put(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware(Role.admin),
  usersController.edit_user_role
)
// post routes
Router.route("/post")
  .post(authMiddleware, upload.single("imageUrl"), postController.add_post)
  .get(authMiddleware, postController.get_posts)
Router.route("/post/:id")
  .put(authMiddleware, upload.single("imageUrl"), postController.edit_post)
  .delete(authMiddleware, postController.delete_post)
  .get(authMiddleware, postController.get_single_post)
// comments routes
Router.route("/post/comment").post(
  authMiddleware,
  commentsController.add_comment
)
Router.get(
  "/post/comment/user",
  authMiddleware,
  commentsController.get_user_comments
)
Router.route("/post/comment/:id")
  .put(authMiddleware, commentsController.edit_comment)
  .delete(authMiddleware, commentsController.delete_comment)
export default Router
