import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { connectToDb } from "../../../../utils";

export async function GET(req: Request) {
  try {
    await connectToDb();
    const users = await prisma.user.findMany();
    return NextResponse.json({users},{status:200})
  } catch (error:any) {
    return new Error(error.message);
  }
  finally{
    await prisma.$disconnect();
  }
}