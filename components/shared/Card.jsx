'use client'
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import DeleteComfirmation from "./DeleteComfirmation"

 const Card = ({event, hasOrderLink, hidePrice}) => {

    const {data: userId} = useSession()


       const isEventCreator = userId?.user.id === event?.organizer?._id.toString()

        

  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link href={`/events/${event?._id}`} 
          style={{backgroundImage: `url(${event?.imageUrl})`}}
          className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />
         {/* Is Event Creator */} 
         

          {isEventCreator && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
              <Link className="" href={`/events/${event?._id}/update`}>
                 <Image src="/assets/icons/edit.svg" alt="edit" width={24} height={20}/>
              </Link>
                  <DeleteComfirmation eventId={event?._id}/>
            </div>
           )}
          
         < div
          className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        >
           {!hidePrice && 
          <div className="flex gap-2">
             <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60 whitespace-nowrap">
               {event?.isFree ? 'Free' : `$${event?.price}`}
             </span>
              <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event?.category?.name}</p>
          </div>
            }  

            <p className="p-medium-16 p-medium-18 text-grey-500">{formatDateTime(event?.startDateTime).dateTime}</p>
             <Link 
             href={`/events/${event?._id}`} 
             >
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event?.title}</p>
             </Link>
 
            <div className="flex-between w-full">
             <p className="p-medium-14 md:p-medium-16 text-grey-600 ">{event?.organizer?.username}</p>

              {
                hasOrderLink && (
                 <Link href={`/orders?eventId=${event?._id}`} className="flex gap-2">
                    <p className="text-primary-500 ">Order Detail</p>
                     <Image src="/assets/icons/arrow.svg" alt="search " width={10} height={10}/>
                 </Link>
              )}
            </div>
        </div>
         
    </div>
  )
}

export default Card
