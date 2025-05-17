import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const donationId = params.id;
    const { refundTxHash } = await request.json();

    // Find the donation
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: { campaign: true },
    });

    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    if (donation.status === "REFUNDED") {
      return NextResponse.json(
        { error: "Donation already refunded" },
        { status: 400 }
      );
    }

    // Update donation status
    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: "REFUNDED",
        refundTxHash,
      },
    });

    // Reduce campaign total
    await prisma.campaign.update({
      where: { id: donation.campaignId },
      data: {
        currentAmount: {
          decrement: donation.amount,
        },
      },
    });

    // Create transaction record for refund
    await prisma.transaction.create({
      data: {
        type: "REFUND",
        amount: donation.amount,
        date: new Date(),
        fromId: donation.campaign.creatorAddress,
        toId: donation.donorId,
        txHash: refundTxHash,
      },
    });

    return NextResponse.json({ success: true, donation: updatedDonation });
  } catch (error) {
    console.error("Error processing refund:", error);
    return NextResponse.json(
      { error: "Failed to process refund" },
      { status: 500 }
    );
  }
}
