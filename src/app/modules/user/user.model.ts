import { Schema, model } from 'mongoose';
import { IUserModel, TPassword, TUser } from './user.interface';
import { USER_ROLE } from './user.constants';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUND } from '../../config';

const userSchema = new Schema<TUser, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: { type: String, enum: Object.values(USER_ROLE), required: true, default: 'user' },
    passwordHistory: { type: [{ password: String, timestamp: Date }], select: 0, default: null },
  },
  { timestamps: true },
);

// hassing password before inserting into DB
userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, Number(BCRYPT_SALT_ROUND));
    this.password = hashedPassword;
    this.passwordHistory.push({ password: hashedPassword, timestamp: new Date() });
    next();
  } catch (error: any) {
    next(error);
  }
});
// After saving data exclude password
userSchema.post('save', function (doc, next) {
  if (doc.password) {
    const noPassDoc: Omit<TUser, 'password' | 'passwordHistory'> & {
      password?: string;
      passwordHistory?: TPassword;
    } = {
      ...doc.toObject(),
      password: undefined,
      passwordHistory: undefined,
    };

    // Update the original document with the new object
    Object.assign(doc, noPassDoc);
  }
  next();
});

userSchema.statics.isUserExists = async function (id) {
  const existingUser = await this.findById(id);
  return existingUser ? true : false;
};
userSchema.statics.isPasswordMatched = async function (password, hashedPassword): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
};

export const User = model<TUser, IUserModel>('User', userSchema);
