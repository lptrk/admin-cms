import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
                                              children
                                          }: {
    children: React.ReactNode
}) {

    //Check if logged in
    const {userId} = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    //Check the users store
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    //If store exists, redirect to dynamic dashboard route
    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}