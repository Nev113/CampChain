import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    try {
      // Gunakan upsert untuk menghindari error unique constraint
      const user = await prisma.user.upsert({
        where: {
          address: address,
        },
        update: {}, // tidak ada yang perlu diupdate jika sudah ada
        create: {
          address,
        },
      });

      const isNewUser = user.id ? true : false;
      return NextResponse.json(
        { user, isNewUser },
        { status: isNewUser ? 201 : 200 }
      );
    } catch (error) {
      console.error("Error creating/updating user:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
