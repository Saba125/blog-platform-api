import Utils from "../../../utils"
import { Response, Request } from "express"
import db from "../../../db"
export default async function edit_user_role(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = await db.user.update({
    where: { id },
    data: {
      role: req.body.role,
    },
  })
  return Utils.sendSuccess(res, {
    user,
  })
}
