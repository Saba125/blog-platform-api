import add_comment from "./add_comment/index"
import delete_comment from "./delete_comment"
import edit_comment from "./edit_comment/index"
import get_user_comments from "./get_user_comments/index"
const commentsController = {
  add_comment,
  edit_comment,
  get_user_comments,
  delete_comment,
}
export default commentsController
