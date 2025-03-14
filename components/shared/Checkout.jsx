import { useEffect } from "react"
import { Button } from "../ui/button"
import {loadStripe} from "@stripe/stripe-js"
import { checkoutOrder } from "@/lib/actions/order.actions"

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Checkout = ({event, userId}) => {


       useEffect(() => {

         const query = new URLSearchParams(window.location.search)

          if(query.get('success')) {
             console.log('Order placed! You will an email confirmation.')
          }
           
           if(query.get('canceled')){
            console.log('order canceled.')
           }

       },[])

    const onCheckout = async () => {
            console.log('Checked out')
          const order = {
             eventTitle: event.title,
             eventId: event._id,
             price: event.price,
             isFree: event.isFree,
             buyerId: userId
         }

          await checkoutOrder(order)
     }

  return (
     <form action={onCheckout} method="post">
     <Button type="submit" role="link" size="lg" className="button sm:w-fit">
          {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
     </Button>
     </form>
  )
}

export default Checkout