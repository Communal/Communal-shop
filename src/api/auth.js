'use server';

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../db/User';

// Connect to MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function handleLogin(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Basic validation
  if (!email || !password) {
    return { ...prevState, error: 'Email and password are required' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ...prevState, error: 'Please enter a valid email address' };
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { ...prevState, error: 'Invalid email or password' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { ...prevState, error: 'Invalid email or password' };
    }

    user.updatedAt = new Date();
    await user.save();

    const token = Buffer.from(`${user._id}:${user.email}`).toString('base64');

    return {
      email: '',
      password: '',
      error: '',
      success: 'Login successful!',
      token,
    };
  } catch (error) {
    console.error('Error during login:', error);
    return { ...prevState, error: 'Login failed. Please try again.' };
  }
}

export async function handleSignup(prevState, formData) {
  const email = formData.get('email');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  // Validations (same as before)
  if (!email || !firstName || !lastName || !phone || !password || !confirmPassword) {
    return { ...prevState, error: 'All fields are required', success: '' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ...prevState, error: 'Please enter a valid email address', success: '' };
  }
  if (password.length < 6) {
    return { ...prevState, error: 'Password must be at least 6 characters long', success: '' };
  }
  if (password !== confirmPassword) {
    return { ...prevState, error: 'Passwords do not match.', success: '' };
  }

  // Phone validation
  const phoneRegex = /^(\+234|0)?[789][01]\d{8}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    return { ...prevState, error: 'Invalid Nigerian phone number', success: '' };
  }

  let normalizedPhone = cleanPhone;
  if (cleanPhone.startsWith('+234')) normalizedPhone = '0' + cleanPhone.slice(4);
  if (cleanPhone.startsWith('234')) normalizedPhone = '0' + cleanPhone.slice(3);

  if (normalizedPhone.length !== 11) {
    return { ...prevState, error: 'Phone must be exactly 11 digits', success: '' };
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { ...prevState, error: 'Account already exists', success: '' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      phone: normalizedPhone,
      password: hashedPassword,
    });

    console.log('User created:', newUser);

    return {
      email,
      firstName,
      lastName,
      phone: normalizedPhone,
      password: '',
      confirmPassword: '',
      error: '',
      success: 'Account created successfully! Redirecting to login...',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { ...prevState, error: 'Failed to create account. Please try again.', success: '' };
  }
}