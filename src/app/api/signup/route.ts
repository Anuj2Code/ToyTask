import prisma from "../../../../prisma";
import { connectToDb } from "../../../../utils";
import {NextRequest,NextResponse} from 'next/server'
import * as EmailValidator from 'email-validator';
import bcryptjs from 'bcryptjs'

connectToDb();
export async function POST(req: NextRequest) {
    try {
        const {email,password,name} = await req.json();
        if(!email || !password || !name){
            return NextResponse.json({
                "message":"All Field is required !"
            })
        }
        const validate = EmailValidator.validate(email);
        if(!validate){
         return NextResponse.json({
             "message":"Please provide a valid email ID"
         })
        }
        const userF = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(userF){
            return NextResponse.json({
                "message":"User already exit"
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword}
        })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    finally {
        await prisma.$disconnect();
    }
}
