import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import {param} from "ts-interface-checker";
import {store} from "next/dist/build/output/store";

export async function POST(
    req: Request,
    {params}: { params: { storeId: string } }
) {
    try {
        //Authenticate POST Route
        const {userId} = auth()
        //Extract body
        const body = await req.json()

        //Check if body content is filled
        const {label, imageUrl} = body
        if (!label) {
            return new NextResponse('Label is required', {status: 400})
        }
        if (!imageUrl) {
            return new NextResponse('Image URL is required', {status: 400})
        }
        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }

        //Check if userId is authorized
        if (!userId) {
            return new NextResponse('Unauthenticated', {status: 401});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', {status: 403})
        }

        //Create new Billboard
        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            }

        });
        //Return store details as JSON
        return NextResponse.json(billboard)
    } catch (e) {
        console.log('[BILLBOARDS_POST]', e)
        return new NextResponse("Internal Error", {status: 500})
    }
}


export async function GET(
    req: Request,
    {params}: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }


        //Create new Billboard
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        });
        //Return store details as JSON
        return NextResponse.json(billboards)
    } catch (e) {
        console.log('[BILLBOARDS_GET]', e)
        return new NextResponse("Internal Error", {status: 500})
    }
}