import ConnectDb from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
    ConnectDb();
    const body = await request.json();
    const { email, password } = body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return new Response(
            JSON.stringify({ message: "Admin already exists" }),
            { status: 400 }
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
        email,
        password: hashedPassword,
    });
    await newAdmin.save();
    return new Response(
        JSON.stringify({ message: "Admin created successfully" }),
        { status: 201 }
    );
}