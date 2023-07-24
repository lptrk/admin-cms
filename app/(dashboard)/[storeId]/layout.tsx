import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
                                                  children, params

                                              }: {
                                                  children: React.ReactNode;
                                                  params: { storeId: string; }
                                              }
) {
    //Check if logged in
    const {userId} = auth();

    //Redirect if not logged in
    if (!userId) {
        redirect('/sign-in');
    }

    //If logged in fetch store
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId,
        }
    })

    //Check if store exists
    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar/>
            {children}
        </>

    )
}