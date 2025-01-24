import bcrypt from 'bcrypt';
import User, { IUser, UserRole } from '../models/user.model';
import { Document } from 'mongoose';
import logger from '../utils/logger';

type PlainUser = Omit<IUser, keyof Document>;

const userSeedes: PlainUser[] = [
  {
    email: 'umurava@gmail.com',
    password: 'Test@12345',
    fullname: 'Umurava',
    role: UserRole.ADMIN,
  },
  {
    email: 'caleb@gmail.com',
    password: 'Test@12345',
    fullname: 'Gisa Caleb',
    role: UserRole.TALENT,
  },
  {
    email: 'ganza@gmail.com',
    password: 'Test@12345',
    fullname: 'Ganza Praise',
    role: UserRole.TALENT,
  },
];

const seedUsers = async () => {
  try {
    const adminUser = await User.findOne({ role: UserRole.ADMIN });
    if (adminUser) {
      logger.info('Users already exist');
      return;
    }

    //Clear Existing data
    await User.deleteMany({});

    const usersToInsert = await Promise.all(
      userSeedes.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(usersToInsert);
    logger.info('Users seeded successfully.');
  } catch (error) {
    logger.error(error);
  }
};

export default seedUsers;
