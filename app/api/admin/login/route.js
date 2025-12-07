import mongoose from "mongoose";
import Admin from "@/models/Admin";
import ConnectDb from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    ConnectDb();
    const { email, password } = await request.json();
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
        status: 401,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
        status: 401,
      });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    const res = NextResponse.json({
      success: true,
      message: "Redirecting...",
      status: 200,
    });
    res.cookies.set("adminToken", token, {
      httpOnly: true,
      // change the secure to true in production
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60,
    });
    return res;
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
