import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  TALENT = 'Talent',
}

export interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  profilePic?: string | null;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    profilePic: { type: String, default: null },
    role: { type: String, enum: Object.values(UserRole), required: true, default: UserRole.TALENT },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('Users', userSchema);

export default User;
