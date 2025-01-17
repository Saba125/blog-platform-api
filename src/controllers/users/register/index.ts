import Utils from "../../../utils"
import { Response, Request } from "express"
import registerSchema from "./schema"
import db from "../../../db"
export default async function register(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body)
  const { email, password } = req.body
  console.log(req.body)
  const oneDay = 1000 * 60 * 60 * 24
  const image = req.file?.filename
  const imageUrl = image ? `/images/${image}` : null
  const hashedPassword = Utils.getCryptoHash(password)
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      imageUrl,
    },
  })
  const token = Utils.createToken(user)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  return Utils.sendSuccess(res, {
    user,
    token,
  })
}
