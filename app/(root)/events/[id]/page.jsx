import CheckoutButton from "@/components/shared/CheckoutButton"
import Collection from "@/components/shared/Collection"
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/events.actions"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"

 const EventDetail = async ({params: {id}, searchParams}) => {
     
    const event = await getEventById(id)
      
      const relatedEvents = await getRelatedEventsByCategory({
         categoryId: event.category._id,
          eventId: event._id,
          page: searchParams.page
      })
    
     
  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain sm:px-10 px-5" >
        <div className="grid grid-col-1 md:grid-cols-2 2xl:max-w-7xl">
            
            <Image 
           src={event?.imageUrl}
            alt="hero image"
             width={1000} 
             height={1000}
              className="h-full min-h-[300px] object-cover object-center"
              /> 
   
            <div className="flex w-full flex-col gap-8 p-5 md:p-10">
               <div className="flex flex-col gap-6">
                 <h2 className="h2-bold">{event.title}</h2>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center ">
                      <div className="flex gap-3 items-center">
                       <p className="p-bold-20 rounded-full bg-green-500/10 px-4 py-2 text-center text-green-700 whitespace-nowrap w-full h-full">{event.isFree ? "Free" : `$${event.price}`}</p>
                        <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500 whitespace-nowrap w-full h-full">
                         {event.category.name}
                        </p>
                      </div>
                          
                      </div>
                    <p className="p-medium-18 ml-2 sm:mt-2 sm:mt-0">
                           by{' '}
                           <span className="text-primary-500">{event.organizer.username}</span>
                        </p>
                      </div>

                          <CheckoutButton event={event}/>

                     <div className="flex flex-col gap-5">
                        <div className="flex gap-2 md:gap-3">
                          <Image src="/assets/icons/calendar.svg" alt="calender" width={32} height={32}/>
                           <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center gap-2">
                             <p className="text-lg font-sans font-semibold">
                              {formatDateTime(event.startDateTime).dateOnly} , {''}
                               {formatDateTime(event.startDateTime).timeOnly}{''} -
                             </p> 
                              
                             <p className="text-lg font-sans font-semibold">{formatDateTime(event.endDateTime).dateOnly} - {' '}{formatDateTime(event.endDateTime).timeOnly} </p>
                           </div>
                        </div>

                        <div className="p-regular-20 flex items-center gap-3">
                           <Image src="/assets/icons/location.svg" alt="location" width={32} height={32}/>
                            <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                        </div>
                     </div>
                   <div className="flex flex-col gap-2 ">
                         <p className="p-bold-20 text-grey-600">
                             What You'll Learn:
                         </p>
                           <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
                           <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer">{event.url}</p>
                   </div>
                 </div> 
               </div>
      </section>
           
        <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 sm:px-10 px-5">
            <h2 className="h2-bold">Related Events</h2>

            <Collection 
                 data={relatedEvents?.data}
                 emptyTitle="No Event Found."
                 emptyStateSubtext="Come back later."
                 collectionType="All_Events"
                 limit={3}
                 page={searchParams.page}
                 totalPages={relatedEvents?.totalPages}
               />
        </section>
      </>
  )
 }

export default EventDetail