import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/events.actions'
  

const UpdateEvent = async({params: {id}}) => {
   
      const event = await getEventById(id)

    return (
     <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 max-xl:px-10 px-5'>
      <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
    </section>
     
     <div className='wrapper my-8'>
        <EventForm type='Update' event={event} eventId={event._id}/>
     </div>
     </>
  )
}

export default UpdateEvent