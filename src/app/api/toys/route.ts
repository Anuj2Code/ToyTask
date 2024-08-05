import { NextResponse,NextRequest } from "next/server";
import prisma from "../../../../prisma";
import { connectToDb } from "../../../../utils";

connectToDb();
export async function GET(req:NextRequest) {
  try {
    const usersToys = await prisma.toys.findMany();
    return NextResponse.json({usersToys},{status:200})
  } catch (error:any) {
    return new Error(error.message);
  }
  finally{
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
    try {
        const {Name,userId,Price} = await req.json();
        const users = await prisma.user.findFirst({
            where:{
               id:userId
            }
        })
        if(!users){
            return NextResponse.json({
                "message":"User not exit"
            })
        }
        const toys = await prisma.toys.create({
            data:{
                Name,
                Price,
                userId
            }
        })
        return NextResponse.json({ toys }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const {userId,ToyId} = await req.json();
        console.log(userId,ToyId);
        
        const users = await prisma.user.findFirst({
            where:{
               id:userId
            }
        })
        const ty = await prisma.toys.findFirst({
            where:{
                id:ToyId
            }
        })
        if(!users || !ty){
            return NextResponse.json({
                "message":"Something went wrong"
            })
        }
        const tweet = await prisma.toys.delete({
            where:{
                id:ToyId
            }
        })
        return NextResponse.json({ message:"ok deleted",tweet}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {userId,ToyId,Name,Price} = await req.json();       
        const users = await prisma.user.findFirst({
            where:{
               id:userId
            }
        })
        const ty = await prisma.toys.findFirst({
            where:{
                id:ToyId
            }
        })
        if(!users || !ty){
            return NextResponse.json({
                "message":"Something went wrong"
            })
        }
        const toys = await prisma.toys.update({
            where:{
                id:ToyId
            },
            data:{
                Price:Price,
                Name:Name
            }
        })
        return NextResponse.json({ message:"ok deleted",toys}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    finally {
        await prisma.$disconnect();
    }
}