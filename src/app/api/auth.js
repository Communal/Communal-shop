// actions/auth.js
"use server";
import bcrypt from "bcryptjs";
import connectDB from "../../config/db";
import User from "../../db/schema/User";

// Handle Signup
export async function handleSignup(prevState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!firstName || !lastName || !email || !password) {
    return { ...prevState, error: "All fields are required" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ...prevState, error: "Please enter a valid email address" };
  }

  try {
    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { ...prevState, error: "Email already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "USER",
      balance: 0,
    });

    const token = Buffer.from(`${newUser._id}:${newUser.email}`).toString(
      "base64"
    );

    const safeUser = {
      id: newUser._id.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      balance: 0,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return {
      success: "Signup successful!",
      error: "",
      token,
      user: safeUser,
    };
  } catch (error) {
    console.error("Error during signup:", error);
    return { ...prevState, error: "Signup failed. Please try again." };
  }
}

// Handle Login
export async function handleLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { ...prevState, error: "Email and password are required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ...prevState, error: "Please enter a valid email address" };
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return { ...prevState, error: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { ...prevState, error: "Invalid email or password" };
    }

    user.updatedAt = new Date();
    await user.save();

    const token = Buffer.from(`${user._id}:${user.email}`).toString("base64");

    const safeUser = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      role: user.role,
      profileImage: user.profileImage,
      balance: user.balance ? parseFloat(user.balance.toString()) : 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      success: "Login successful!",
      error: "",
      token,
      user: safeUser,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { ...prevState, error: "Login failed. Please try again." };
  }
}