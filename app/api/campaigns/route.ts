import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const campaign = await request.json();

    const result = await prisma.campaign.create({
      data: {
        title: campaign.title,
        description: campaign.description,
        goal: campaign.goal,
        imageUrl: campaign.imageUrl,
        creatorAddress: campaign.creatorAddress,
        isActive: true,
        currentAmount: 0,
        milestones: {
          create: campaign.milestones.map((milestone: any) => ({
            title: milestone.title,
            description: milestone.description,
            amount: milestone.amount,
            completed: false,
            order: milestone.order,
          })),
        },
      },
    });

    return NextResponse.json(
      { success: true, campaign: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;

    const campaigns = await prisma.campaign.findMany({
      include: {
        milestones: true,
        creator: {
          select: {
            address: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(limit ? { take: limit } : {}),
      where: {
        // Only show active campaigns by default
        isActive: true,
      },
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}
