require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");

    const existingUser = await User.findOne({ username: "admin" });
    if (existingUser) {
      console.log("⚠️ Admin user already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      username: "admin",
      password: hashedPassword
    });

    await admin.save();
    console.log("🎉 Admin User Created Successfully!");
    console.log("Username: admin");
   

    process.exit();
  } catch (error) {
    console.log("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();