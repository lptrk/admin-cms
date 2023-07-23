import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        //Authenticate POST Route
        const {userId} = auth()
        //Extract body
        const body = await req.json()

        //Check if name is filled
        const {name} = body
        if (!name) {
            return new NextResponse('Name is required', {status: 400})
        }

        //Check if userId is authorized
        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        //Create new Store
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })
        //Return store details as JSON
        return NextResponse.json(store)
    } catch (e) {
        console.log('[STORES_POST]', e)
        return new NextResponse("Internal Error", {status: 500})
    }
}