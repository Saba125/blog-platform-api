import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function add_comment(req: Request, res: Response) {
  const user: any = req.user
  const { postId, comment } = req.body
  const createComment = await db.comment.create({
    data: {
      comment,
      postId,
      authorId: user.id,
    },
  })
  return Utils.sendSuccess(res, {
    comment: createComment,
  })
}
