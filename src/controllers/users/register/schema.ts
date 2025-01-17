import Joi from "joi"
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
//   role: Joi.valid("user", "admin").required(),
  imageUrl: Joi.string().optional(),
})
export default registerSchema
