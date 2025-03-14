import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import NavItems from "./NavItems"
 

const MobileNav = ({isUserLoggedIn}) => {
  return (
    <nav className="md:hidden shrink-0">
     <Sheet>
     <SheetTrigger className="align-middle">
         <Image src="/assets/icons/menu.svg"
           alt="menu"
           width={24}
           height={24}
            className="cursor-pointer"
         />
     </SheetTrigger>
     <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
        <Image src="/assets/images/logo.svg" width={128} height={38} alt="logo"/>
         {/* <Separator/> */}
        <NavItems />
        { isUserLoggedIn && (
           <div className="flex gap-2 items-center mt-3">
          <Image src={isUserLoggedIn?.user?.image} width={50} height={18} alt='event logo' className="rounded-full"/>
           <div className="flex flex-col gap-1">
           <p className=" text-sm font-poppins">{isUserLoggedIn?.user?.name}</p>
           <p className="text-sm font-serif">{isUserLoggedIn?.user?.email}</p>
  

           </div>
                     </div>
        
        )
        }
     </SheetContent>
   </Sheet>
    </nav>
  )
}

export default MobileNav