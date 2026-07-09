// models/Registration.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hospital: string;
  specialty?: string;
  remark?: string;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hospital: { type: String, required: true },
  specialty: { type: String, required: false },
  remark: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Registration: Model<IRegistration> = 
  mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;