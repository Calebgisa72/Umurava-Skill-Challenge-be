import mongoose, { Document, Schema } from 'mongoose';

export enum seniorityLevel {
  JUNIOR = 'Junior',
  INTERMEDIATE = 'Intermediate',
  SENIOR = 'Senior',
}

export enum status {
  OPEN = 'Open',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}

export enum currencies {
  USD = '$',
  EUR = '€',
  RWF = 'RWF',
}

export interface Prize {
  rank: string; // E.g: "1st Prize"
  minAmount: number | null;
  maxAmount: number;
  currency: currencies;
}

const prizeSchema = new Schema<Prize>(
  {
    rank: { type: String, required: true },
    minAmount: {
      type: Number,
      default: null,
      validate: {
        validator: function (this: Prize, value: number | null) {
          return value === null || (value >= 0 && value <= this.maxAmount);
        },
        message: 'minAmount should be less than or equal to maxAmount and non-negative.',
      },
    },
    maxAmount: { type: Number, required: true },
    currency: { type: String, enum: Object.values(currencies), required: true },
  },
  { _id: false }
);

export interface IChallenge extends Document {
  thumbnail: string;
  title: string;
  projectBrief: string;
  projectDescription: string;
  deadline: Date;
  prize: Prize[];
  projectTasks: string;
  neededSkills: string[];
  seniorityLevel: seniorityLevel;
  createdAt?: Date;
  updatedAt?: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    projectBrief: { type: String, required: true },
    projectDescription: { type: String, required: true },
    deadline: { type: Date, required: true },
    prize: { type: [prizeSchema], required: true },
    projectTasks: { type: String, required: true },
    neededSkills: { type: [String], required: true },
    seniorityLevel: { type: String, enum: Object.values(seniorityLevel), required: true },
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);

export default Challenge;
