import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
import addPostSchema from "./schema"
export default async function add_post(req: Request, res: Response) {
  const user: any = req.user
  const body = req.body
  const { error } = addPostSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const imageUrl = req.file ? `/images/${req.file?.filename}` : null
  const post = await db.post.create({
    data: {
      title: body.title,
      content: body.content,
      imageUrl,
      authorId: user.id,
    },
  })
  return Utils.sendSuccess(res, {
    post,
  })
}
