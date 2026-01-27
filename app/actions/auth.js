"use server";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export async function signupAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const name = formData.get("name");

  // Validation
  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || undefined,
      },
    });

    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An error occurred during signup" };
  }
}
