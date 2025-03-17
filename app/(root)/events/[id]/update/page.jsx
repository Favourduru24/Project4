import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/events.actions'
  

const UpdateEvent = async({params: {id}}) => {
   
      const event = await getEventById(id)

    return (
     <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5 sm:px-10 2xl:px-0'>
      <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
    </section>
     
     <div className='max-w-7xl lg:mx-auto p-5 w-full my-8 px-5 sm:px-10 2xl:px-0'>
        <EventForm type='Update' event={event} eventId={event._id}/>
     </div>
     </>
  )
}

export default UpdateEvent