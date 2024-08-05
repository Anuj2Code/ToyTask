
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from "../../../../prisma";
import { connectToDb } from "../../../../utils";

connectToDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if (!user) {
            return NextResponse.json({ "message": "User do not exist" }, { status: 500 })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ "message": "Password is incorrect" }, { status: 500 })
        }
        const token = {
            id: user.id,
            email: user.email
        }
        const tokenn = jwt.sign(token, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        console.log(tokenn);

        const response = NextResponse.json({
            "message": "User login successfully"
        })
        response.cookies.set("token", tokenn, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}