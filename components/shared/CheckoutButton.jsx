"use client"
import { useSession } from "next-auth/react"
import Checkout from "./Checkout"

const CheckoutButton = ({event}) => {

     const checkedOutEvent = new Date(event.endDateTime) < new Date()
      const {data} = useSession()

       const userId = data?.user.id
        
   return (
    <> 
        {userId && (
        <div className="flex items-center gap-3">
         {checkedOutEvent ? (
       <p className="p-2 text-red-400">Sorry, Ticket are no longer available.</p>
         ) : (
            <>
               <Checkout event={event} userId={userId}/>
            </> )}

         </div> )}
     </>
        
  )
}

export default CheckoutButton