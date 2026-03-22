
import { AppSidebar } from "@/components/layout/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/role"
import { userService } from "@/services/user.service"
import React from "react"

export default async function DashboardLayout({children,admin,seller,customer}:
  {children:React.ReactNode;
    admin:React.ReactNode;
    seller:React.ReactNode;
    customer:React.ReactNode;

  }) {


     const {data}=await userService.getSession()
   const user=data.user;
  //  console.log(data.user.role);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
         
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
        {/* {admin}
        {seller}
        {customer} */}
        {
  user.role === Roles.admin
    ? admin
    : user.role === Roles.seller
    ? seller
    : customer
}

         
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

