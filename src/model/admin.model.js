import mongoose, { Schema } from "mongoose"; // ✅ this line

const adminSchema = new Schema({
  code: { type: String },
  name: { type: String },
  type: { type: String }, // e.g. 'admin'
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  is_agency: { type: Number, default: 0 },
  sub_type: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
  temp_id: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
