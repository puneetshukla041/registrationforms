const mongoose = require('mongoose');

// Connect to MongoDB (Vercel will look for this in your Env Variables)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

const PhysicianSchema = new mongoose.Schema({
  firstName: String, lastName: String, email: String, 
  phone: String, hospital: String, specialty: String, remark: String
});

const Physician = mongoose.models.Physician || mongoose.model('Physician', PhysicianSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  
  try {
    await connectDB();
    const data = await Physician.create(req.body);
    return res.status(200).json({ success: true, id: data._id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}