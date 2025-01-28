import User, { IUser } from '../models/user.model';
import { ErrorCodes, AppError } from '../utils/errors.utils';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.utils';

interface LoginCredentials {
  email: string;
  password: string;
}

interface updateProfileProps {
  userId: string;
  password?: string;
  fullname?: string;
  profilePic: string;
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

export const updateUserProfileService = async ({ userId, password, fullname, profilePic }: updateProfileProps) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404, ErrorCodes.INVALID_INPUT);
  }

  const isSameFullname = fullname ? fullname === user.fullname : true;
  const isSameProfilePic = profilePic ? profilePic === user.profilePic : true;
  const isSamePassword = password ? await bcrypt.compare(password, user.password) : true;

  if (isSameFullname && isSameProfilePic && isSamePassword) {
    const sanitizedUserInfo = user.toObject() as Record<string, any>;
    delete sanitizedUserInfo.password;
  
    return {
      sanitizedUserInfo,
      message: 'No changes detected in the provided data.',
      statusCode: 200,
    };
  }

  const updateFields: Partial<IUser> = {};

  if (fullname) {
    updateFields.fullname = fullname;
  }

  if (profilePic) {
    updateFields.profilePic = profilePic;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

  if (!updatedUser) {
    throw new AppError('Error updating user profile', 500, ErrorCodes.DATABASE);
  }

  const sanitizedUserInfo = updatedUser.toObject() as Record<string, any>;
  delete sanitizedUserInfo.password;

  const message = 'User profile updated successfully.';
  const statusCode = 200;

  return { sanitizedUserInfo, message, statusCode };
};
