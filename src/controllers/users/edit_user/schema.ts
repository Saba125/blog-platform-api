import Joi from "joi"
const editUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  imageUrl: Joi.string().optional(),
})
export default editUserSchema
