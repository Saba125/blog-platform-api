import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
import editPostSchema from "./schema"
export default async function edit_post(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const body = req.body
  const { error } = editPostSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const currentPost = await db.post.findUnique({ where: { id } })
  if (!currentPost) {
    Utils.sendError(res, {
      status: "error",
      message: `Post with id ${id} is not found`,
    })
    return
  }
  const post = await db.post.update({
    where: { id },
    data: {
      ...req.body,
      imageUrl: req.file
        ? `/images/${req.file.filename}`
        : currentPost?.imageUrl,
    },
  })
  return Utils.sendSuccess(res, {
    post,
  })
}
