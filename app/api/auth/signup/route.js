import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const { username, firstname, email, password } = data;

    if (!username || !firstname || !email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const [emailTaken, usernameTaken] = await Promise.all([
      db.user.findUnique({ where: { email } }),
      db.user.findUnique({ where: { username } })
    ]);

    if (emailTaken) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    if (usernameTaken) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        firstname,   
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("SignUp error:", error);
    return NextResponse.json(
      { message: "Internal error" },
      { status: 500 }
    );
  }
}
