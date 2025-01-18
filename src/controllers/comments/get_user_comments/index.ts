import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function get_user_comments(req: Request, res: Response) {
  console.log(`i am here from get_user_comments`)
  const user: any = req.user
  const comments = await db.comment.findMany({
    where: { authorId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  })
  return Utils.sendSuccess(res, {
    comments,
  })
}
