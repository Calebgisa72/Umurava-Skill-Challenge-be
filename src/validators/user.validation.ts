import Joi from 'joi';
import { UserRole } from '../models/user.model';

export const signupValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,12}$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.pattern.base':
        'Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and have no spaces',
      'any.required': 'Password is required',
    }),

  fullname: Joi.string().min(5).max(40).required().messages({
    'string.base': 'Fullname must be a string',
    'string.min': 'Fullname must be at least 5 characters long',
    'string.max': 'Fullname must not exceed 40 characters',
    'any.required': 'Fullname is required',
  }),

  role: Joi.string().valid(UserRole.ADMIN, UserRole.TALENT).default(UserRole.TALENT).messages({
    'string.base': 'Role must be a string',
    'any.only': 'Role must be either "Admin" or "Talent"',
  }),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});
