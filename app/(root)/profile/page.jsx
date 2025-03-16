"use client"
import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {useSession} from "next-auth/react"
import { getEventsByUser } from "@/lib/actions/events.actions" 
import { useEffect, useState } from "react"
import { getOrdersByUser } from "@/lib/actions/order.actions"

const Profile = () => {

    const { data: session, status } = useSession()
    const [organizedEvent, setOrganizedEvent] = useState([])
    const [orderedEvent, setOrderedEvent] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      // If session is available, fetch the events
       const fetchEvents = async () => {
        if (session?.user?.id) {
          try {
            const userId = session.user.id
            const fetchedEvents = await getEventsByUser({ userId, page: 1 })
            setOrganizedEvent(fetchedEvents) // Assuming fetchedEvents is the list of events
          } catch (err) {
            console.error("Error fetching events:", err)
            setError("Failed to load events.")
          } finally {
            setLoading(false)
          }
        }
      }

      const fetchOrdersByUser = async () => {
        if (session?.user?.id) {
          try {
            const userId = session.user.id
            const fetchedOrders = await getOrdersByUser({ userId, page: 1 })
             
            console.log({fetchedOrders})
             
             const orders = fetchedOrders.data.map((fetch) => fetch.event) || []
            setOrderedEvent(orders) // Assuming fetchedEvents is the list of events
          } catch (err) {
            console.error("Error fetching events:", err)
            setError("Failed to load orders.")
          } finally {
            setLoading(false)
          }
        }
      }
  
      // Fetch events when session is available
      if (session?.user?.id) {
         fetchEvents()
        fetchOrdersByUser()
      }
    }, [session])

     
     
    return (
    <>
   <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5 sm:px-10">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
           <Button className="button hidden sm:flex" size="lg">
                 <Link href="/#events">
                 Explore More Events 
                </Link>
           </Button>
        </div>
     </section>
      
      <section className="wrapper my-8">
       
            <Collection 
                data={orderedEvent}
                emptyTitle="No event tickets purchased yet."
                emptyStateSubtext="No worries More event to explore!"
                collectionType="My_Tickets"
                limit={3}
                page={1}
                urlParamName="ordersPage"
                totalPage={2}
              />
      </section>
       
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5 sm:px-10">
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
      <Collection 
          data={organizedEvent?.data}
          emptyTitle="No event have been created yet."
          emptyStateSubtext="Go create some now."
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPage={2}
        />

</section>
</>
  )
}

export default Profile