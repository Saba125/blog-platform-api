import Utils from "../../../utils"
import { Response, Request } from "express"
import loginSchema from "./schema"
import db from "../../../db"
export default async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const hashedPassword = Utils.getCryptoHash(password)
  const { error } = loginSchema.validate(req.body)
  const oneDay = 1000 * 60 * 60 * 24
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    Utils.sendError(res, {
      status: "message",
      message: "User does not exist with that email",
    })
    return
  }
  if (hashedPassword !== user.password) {
    Utils.sendError(res, {
      status: "error",
      message: "Password is incorrect",
    })
    return
  }
  const token = Utils.createToken(user)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  return Utils.sendSuccess(res, {
    user,
  })
}
