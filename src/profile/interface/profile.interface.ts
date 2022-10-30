import { Document } from 'mongoose';

export interface IProfile extends Document {
  readonly user: string;
  readonly gender: string;
  readonly address: string;
  readonly religion: string;
  readonly image: string;
}
