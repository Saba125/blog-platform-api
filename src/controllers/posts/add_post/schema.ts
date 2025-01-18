import Joi from "joi"
const addPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  imageUrl: Joi.string().optional(),
})
export default addPostSchema
