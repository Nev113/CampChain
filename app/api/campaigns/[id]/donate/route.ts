import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignId = params.id;
    const { amount, txHash, donorAddress } = await request.json();

    // Find or create donor based on address
    const donor = await prisma.user.upsert({
      where: { address: donorAddress },
      update: {},
      create: { address: donorAddress },
    });

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        txHash,
        campaign: {
          connect: { id: campaignId },
        },
        donor: {
          connect: { id: donor.id },
        },
        status: "COMPLETED",
      },
    });

    // Update campaign total amount
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        currentAmount: {
          increment: parseFloat(amount),
        },
      },
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error("Error processing donation:", error);
    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
}
