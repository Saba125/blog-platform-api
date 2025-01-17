import express from "express"
import usersController from "../controllers/users/export"
const Router = express.Router()
// users routes
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)

export default Router
