import Joi from 'joi';
import { seniorityLevel, status, currencies } from '../models/challenge.model';

const thumbnailSchema = Joi.string().uri().required().messages({
  'string.base': 'Thumbnail must be a string.',
  'string.uri': 'Thumbnail must be a valid URI.',
  'any.required': 'Thumbnail is required.',
});

const titleSchema = Joi.string().min(20).max(50).required().messages({
  'string.base': 'Title must be a string.',
  'string.min': 'Title must be at least 20 characters long.',
  'string.max': 'Title must not exceed 50 characters.',
  'any.required': 'Title is required.',
});

const projectBriefSchema = Joi.string().min(40).max(50).required().messages({
  'string.base': 'Project brief must be a string.',
  'string.min': 'Project brief must be at least 40 characters long.',
  'string.max': 'Project brief must not exceed 50 characters.',
  'any.required': 'Project brief is required.',
});

const projectDescriptionSchema = Joi.string().min(230).max(250).required().messages({
  'string.base': 'Project description must be a string.',
  'string.min': 'Project description must be at least 230 characters long.',
  'string.max': 'Project description must not exceed 250 characters.',
  'any.required': 'Project description is required.',
});

const projectTasksSchema = Joi.string().min(450).max(500).required().messages({
  'string.base': 'Project tasks must be a string.',
  'string.min': 'Project tasks must be at least 450 characters long.',
  'string.max': 'Project tasks must not exceed 500 characters.',
  'any.required': 'Project tasks are required.',
});

const deadlineSchame = Joi.date().required().greater('now').messages({
  'date.base': 'Deadline must be a valid date.',
  'date.greater': 'Deadline must be in the future.',
  'any.required': 'Deadline is required.',
});

const durationSchema = Joi.string().required().messages({
  'string.base': 'Duration must be a string.',
  'any.required': 'Duration is required.',
});

const prizeSchema = Joi.array()
  .items(
    Joi.object({
      rank: Joi.string().required().messages({
        'string.base': 'Rank must be a string.',
        'any.required': 'Rank is required.',
      }),
      minAmount: Joi.number().allow(null).min(0).messages({
        'number.base': 'Min amount must be a number.',
        'number.min': 'Min amount cannot be negative.',
      }),
      maxAmount: Joi.number().required().min(Joi.ref('minAmount')).messages({
        'number.base': 'Max amount must be a number.',
        'number.min': 'Max amount must be greater than or equal to min amount.',
        'any.required': 'Max amount is required.',
      }),
      currency: Joi.string()
        .valid(currencies.EUR, currencies.RWF, currencies.USD)
        .required()
        .messages({
          'string.base': 'Currency must be a string.',
          'any.only': `Currency must be one of the allowed values. ${currencies.EUR}, ${currencies.RWF}, ${currencies.USD}`,
          'any.required': 'Currency is required.',
        }),
    })
  )
  .required()
  .messages({
    'array.base': 'Prize must be an array.',
    'any.required': 'Prize is required.',
  });

const contact_emailSchema = Joi.string().email().required().messages({
  'string.base': 'Contact email must be a string.',
  'string.email': 'Contact email must be a valid email address.',
  'any.required': 'Contact email is required.',
});

const skillsNeededSchema = Joi.array().items(Joi.string().required()).min(1).required().messages({
  'array.base': 'Skills needed must be an array.',
  'array.min': 'At least one skill is required.',
  'any.required': 'Skills needed are required.',
});

const statusSchema = Joi.string()
  .valid(...Object.values(status))
  .required()
  .messages({
    'string.base': 'Status must be a string.',
    'any.only': `Status must be one of the allowed values. ${status.COMPLETED}, ${status.ONGOING}, ${status.OPEN}`,
    'any.required': 'Status is required.',
  });

const seniorityLevelSchema = Joi.string()
  .valid(...Object.values(seniorityLevel))
  .required()
  .messages({
    'string.base': 'Seniority level must be a string.',
    'any.only': `Seniority level must be one of the allowed values. ${seniorityLevel.JUNIOR}, ${seniorityLevel.INTERMEDIATE}, ${seniorityLevel.SENIOR}`,
    'any.required': 'Seniority level is required.',
  });

export const challengeValidationSchema = Joi.object({
  thumbnail: thumbnailSchema,
  title: titleSchema,
  projectBrief: projectBriefSchema,
  projectDescription: projectDescriptionSchema,
  projectTasks: projectTasksSchema,
  deadline: deadlineSchame,
  duration: durationSchema,
  prize: prizeSchema,
  contact_email: contact_emailSchema,
  skillsNeeded: skillsNeededSchema,
  status: statusSchema,
  seniorityLevel: seniorityLevelSchema,
});
