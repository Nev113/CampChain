import { PrismaClient, TransactionType } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, from, amount, type, txHash } = body;

    if (!to || !amount || !type || !from || !txHash) {
      return NextResponse.json(
        { error: "ID, to, from, amount, and type are required" },
        { status: 400 }
      );
    }
    const fromUser = await prisma.user.findUnique({
      where: { address: from },
    });
    if (!fromUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const toUser = await prisma.user.findUnique({
      where: { address: to },
    });
    if (!toUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const transaction = await prisma.transaction.create({
      data: {
        amount: amount,
        type: type as TransactionType,
        date: new Date(),
        fromId: fromUser.id,
        toId: toUser.id,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ fromId: id }, { toId: id }],
      },
      orderBy: {
        date: "desc",
      },
      include: {
        from: true,
        to: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
