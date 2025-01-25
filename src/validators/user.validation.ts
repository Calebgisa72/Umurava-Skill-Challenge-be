import Joi from 'joi';
import { UserRole } from '../models/user.model';

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  });

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,12}$/)
  .required()
  .messages({
    'string.base': 'Password must be a string',
    'string.pattern.base':
      'Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and have no spaces',
    'any.required': 'Password is required',
  });

const fullnameSchema = Joi.string().min(5).max(40).required().messages({
  'string.base': 'Fullname must be a string',
  'string.min': 'Fullname must be at least 5 characters long',
  'string.max': 'Fullname must not exceed 40 characters',
  'any.required': 'Fullname is required',
});

const roleSchema = Joi.string().valid(UserRole.ADMIN, UserRole.TALENT).default(UserRole.TALENT).messages({
  'string.base': 'Role must be a string',
  'any.only': 'Role must be either "Admin" or "Talent"',
});

export const signupValidationSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  fullname: fullnameSchema,
  role: roleSchema,
});

export const loginValidationSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

export const updateProfileValidationSchema = Joi.object({
  password: passwordSchema.optional(),
  fullname: fullnameSchema.optional(),
  profilePic: Joi.string().optional().messages({
    'string.base': 'Profile pic must be a string',
  }),
})
  .or('email', 'password', 'fullname', 'profilePic', 'role')
  .messages({
    'object.missing': 'At least one field must be provided',
  });
