import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
import { User } from "@prisma/client"
export default async function get_posts(req: Request, res: Response) {
  const user: any = req.user
  const posts = await db.post.findMany({
    where: { authorId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  })
  return Utils.sendSuccess(res, {
    posts,
  })
}
