import 'dotenv/config';
import { dbConnect } from '../config/db.config';
import logger from '../utils/logger';
import seedUsers from './user.seed';

const seedDatabase = async () => {
  try {
    await dbConnect();

    logger.info('Starting database seeding...');
    await seedUsers();

    process.exit(1);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};
void seedDatabase();
