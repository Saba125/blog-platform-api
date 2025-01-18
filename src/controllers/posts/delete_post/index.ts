import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
import { User } from "@prisma/client"
export default async function delete_post(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const currentPost = await db.post.findUnique({ where: { id } })
  if (currentPost?.authorId !== user.id) {
    Utils.sendError(res, {
      status: "Error",
      message: `You can only delete ur post`,
    })
    return
  }
  const post = await db.post.delete({ where: { id } })
  return Utils.sendSuccess(res, {
    id: post.id,
    message: `Post with id ${id} has been deleted`,
  })
}
