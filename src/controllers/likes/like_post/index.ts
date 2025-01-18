import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function like_post(req: Request, res: Response) {
  const { postId } = req.body
  const user: any = req.user
  const existingLike = await db.like.findFirst({
    where: {
      postId,
      authorId: user.id,
    },
  })
  if (existingLike) {
    await db.like.delete({ where: { id: existingLike.id } })
  } else {
    const like = await db.like.create({
      data: {
        postId,
        authorId: user.id,
      },
    })
  }
}
