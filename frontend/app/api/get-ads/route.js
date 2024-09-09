import { NextResponse } from "next/server"

export async function GET(){

    try {
        const data = await fetch('mongobd')
        return NextResponse.json({data}).status(200)
    } catch (error) {
        return NextResponse.error()
    }
}