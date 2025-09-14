import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    const newUser = await User.create({ email, password });
    return NextResponse.json(
      { message: "User registered successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to register User" },
      { status: 500 }
    );
  }
}
