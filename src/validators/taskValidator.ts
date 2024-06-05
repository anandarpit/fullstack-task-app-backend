import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  date: Joi.date().iso().required(),
  status: Joi.string().valid('not_started', 'complete').optional()
});

export { taskSchema };
