import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function get_single_post(req: Request, res: Response) {
  console.log(`i am here`)
  const id = parseInt(req.params.id)
  const post = await db.post.findUnique({
    where: { id },
  })
  if (!post) {
    Utils.sendError(res, {
      status: "error",
      message: `Post with id ${id} is not found...`,
    })
    return
  }
  return Utils.sendSuccess(res, {
    post,
  })
}
