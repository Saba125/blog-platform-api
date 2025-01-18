import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
import editUserSchema from "./schema"
export default async function edit_user(req: Request, res: Response) {
  const { error } = editUserSchema.validate(req.body)
  const hashedPassword = Utils.getCryptoHash(req.body.password)
  const id = parseInt(req.params.id)
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const existingUser = await db.user.findUnique({ where: { id } })
  const user = await db.user.update({
    where: { id },
    data: {
      email: req.body.email,
      password: hashedPassword,
      imageUrl: req.file
        ? `/images/${req.file.filename}`
        : existingUser?.imageUrl,
    },
  })
  if (!user) {
    Utils.sendError(res, {
      status: "error",
      message: `User with id ${id} is not found`,
    })
    return
  }
  return Utils.sendSuccess(res, {
    user,
  })
}
