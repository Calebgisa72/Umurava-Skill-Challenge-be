import User, { IUser } from '../models/user.model';
import { ErrorCodes, AppError } from '../utils/errors.utils';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.utils';

interface LoginCredentials {
  email: string;
  password: string;
}

export const createUserService = async ({ email, password, fullname }: IUser) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 409, ErrorCodes.DATA_CONFLICT);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    fullname,
  });

  const sanitizedUserInfo = newUser.toObject() as Record<string, any>;
  delete sanitizedUserInfo.password;

  const message = 'User created successfully.';
  const statusCode = 201;

  return { sanitizedUserInfo, message, statusCode };
};

export const loginUserService = async ({ email, password }: LoginCredentials) => {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken({ userId: user._id, email: user.email, role: user.role });
    return {
      token,
      statusCode: 200,
      message: 'Loggedin Successfully',
    };
  } else {
    throw new AppError('Invalid email or password', 409, ErrorCodes.INVALID_INPUT);
  }
};
