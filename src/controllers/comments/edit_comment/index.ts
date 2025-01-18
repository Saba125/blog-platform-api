import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function edit_comment(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const existingComment = await db.comment.findUnique({ where: { id } })
  if (existingComment?.authorId !== user.id) {
    Utils.sendError(res, {
      status: "error",
      message: "You can only edit your comment",
    })
    return
  }
  const comment = await db.comment.update({
    where: { id },
    data: {
      comment: req.body.comment,
    },
  })
  return Utils.sendSuccess(res, {
    comment,
  })
}
