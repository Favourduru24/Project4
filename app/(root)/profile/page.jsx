"use client"
import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {useSession} from "next-auth/react"

// import { getEventsByUser } from "@/lib/actions/events.actions"
import ProfilePage from "@/components/shared/ProfilePage"

const Profile = () => {

     const {data} = useSession()
      
     const userId = data?.user.id

      console.log({userId})

  return (
   <>
   <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
           <Button className="button hidden sm:flex" size="lg">
                 <Link href="/#events">
                 Explore More Events 
                 {/* guardian49 */}
                </Link>
           </Button>
        </div>
     </section>
      
      <section className="wrapper my-8">
{/*        
            <Collection 
                data={relatedEvents?.data}
                emptyTitle="No event tickets purchased yet."
                emptyStateSubtext="No worries More event to explore!"
                collectionType="My_Tickets"
                limit={3}
                page={1}
                urlParamName="ordersPage"
                totalPage={2}
              /> */}
      </section>
       
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">Event Organized.</h3>
           <Button className="button hidden sm:flex" size="lg">
                 <Link href="/events/create">
                   Create New Event
                </Link>
           </Button>
        </div>
     </section>

     <section className="wrapper my-8">
      
      {/* <Collection 
          data={organizedEvents?.data}
          emptyTitle="No event have been created yet."
          emptyStateSubtext="Go create some now."
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPage={2}
        /> */}
</section>
</>
  )
}

export default Profile