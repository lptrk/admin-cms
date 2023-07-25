export default async function DashboardLayout({
                                                  children, params

                                              }: {
                                                  children: React.ReactNode;
                                                  params: { storeId: string; }
                                              }
) {


    return (
        <div className={'flex h-full w-full justify-center items-center'}>

            {children}
        </div>

    )
}