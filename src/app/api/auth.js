// actions/auth.js
"use server";
import bcrypt from "bcryptjs";
import connectDB from "../../config/db";
import User from "../../db/schema/User";

// Handle Login
export async function handleLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Basic validation
  if (!email || !password) {
    return { ...prevState, error: "Email and password are required" };
  }

  // Email validation
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

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { ...prevState, error: "Invalid email or password" };
    }

    // Update last login
    user.updatedAt = new Date();
    await user.save();

    // Simple base64 token
    const token = Buffer.from(`${user._id}:${user.email}`).toString("base64");

    return {
      email: "",
      password: "",
      error: "",
      success: "Login successful!",
      token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { ...prevState, error: "Login failed. Please try again." };
  }
}

// Handle Signup
export async function handleSignup(prevState, formData) {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Required fields check
  if (
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return { ...prevState, error: "All fields are required", success: "" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      ...prevState,
      error: "Please enter a valid email address",
      success: "",
    };
  }

  // Password validation
  if (password.length < 6) {
    return {
      ...prevState,
      error: "Password must be at least 6 characters long",
      success: "",
    };
  }
  if (password !== confirmPassword) {
    return { ...prevState, error: "Passwords do not match.", success: "" };
  }

  // Phone validation (Nigeria)
  const phoneRegex = /^(\+234|0)?[789][01]\d{8}$/;
  const cleanPhone = phone.replace(/\s/g, "");
  if (!phoneRegex.test(cleanPhone)) {
    return {
      ...prevState,
      error: "Please enter a valid Nigerian phone number",
      success: "",
    };
  }

  let normalizedPhone = cleanPhone;
  if (cleanPhone.startsWith("+234"))
    normalizedPhone = "0" + cleanPhone.slice(4);
  else if (cleanPhone.startsWith("234"))
    normalizedPhone = "0" + cleanPhone.slice(3);

  if (normalizedPhone.length !== 11) {
    return {
      ...prevState,
      error: "Nigerian phone number must be exactly 11 digits",
      success: "",
    };
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        ...prevState,
        error: "An account with this email already exists",
        success: "",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      phone: normalizedPhone,
      password: hashedPassword,
    });

    console.log("User created:", newUser);

    return {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "Account created successfully! Redirecting to login...",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      ...prevState,
      error: "Failed to create account. Please try again.",
      success: "",
    };
  }
}
