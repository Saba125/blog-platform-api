import add_post from "./add_post/index"
import delete_post from "./delete_post/index"
import edit_post from "./edit_post/index"
import get_posts from "./get_posts"
import get_single_post from "./get_single_post"
const postController = {
  add_post,
  edit_post,
  delete_post,
  get_posts,
  get_single_post,
}
export default postController
