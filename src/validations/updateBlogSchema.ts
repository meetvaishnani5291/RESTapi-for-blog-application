import Joi from 'joi';

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim().max(200),
  content: Joi.string(),
  tags: Joi.array().items(Joi.string().trim().max(50)).optional(),
});
