import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User, { IUser, UserRole } from '../models/user.model';
import { Document } from 'mongoose';
import logger from '../utils/logger';
import { AppError } from '../utils/errors.utils';

type PlainUser = Omit<IUser, keyof Document>;

const seedUsers: PlainUser[] = [
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

const seedDatabase = async () => {
  try {
    console.log('fir')
    const adminUser = await User.findOne({ role: UserRole.ADMIN });
    if (adminUser) {
      logger.info('Users already exist');
      return;
    }

    console.log('sec')

    //Clear Existing data
    await User.deleteMany({});

    console.log('three')

    const usersToInsert = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    console.log('four')

    await User.insertMany(usersToInsert);
    logger.info('Users seeded successfully.');
  } catch (error) {
    console.log('error')
    logger.error(error);
  }
};

seedDatabase();
