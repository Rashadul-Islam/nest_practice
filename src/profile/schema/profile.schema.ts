import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
