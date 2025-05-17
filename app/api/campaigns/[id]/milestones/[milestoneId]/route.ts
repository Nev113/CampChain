import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update milestone status (complete or incomplete)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; milestoneId: string } }
) {
  try {
    const { completed } = await request.json();
    const { id, milestoneId } = params;

    // Find the campaign to verify ownership
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
      select: { creatorAddress: true },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Get the user's wallet address from the request
    const walletAddress = request.headers.get("x-wallet-address");

    // Check if the request is from the campaign creator
    if (!walletAddress || campaign.creatorAddress !== walletAddress) {
      return NextResponse.json(
        { error: "Unauthorized: Only campaign creator can update milestones" },
        { status: 403 }
      );
    }

    // Update the milestone status
    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ milestone: updatedMilestone });
  } catch (error) {
    console.error("Error updating milestone:", error);
    return NextResponse.json(
      { error: "Failed to update milestone" },
      { status: 500 }
    );
  }
}
