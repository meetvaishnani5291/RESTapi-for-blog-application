import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().required().trim().max(200),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string().trim().max(50)).optional(),
});
