import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import  Search from "../../components/shared/Search";
import { getAllEvent } from "@/lib/actions/events.actions";
import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/shared/CategoryFilter";

  

   export default async function Home ({searchParams}) {
         
    const page = Number(searchParams?.page) || 1
    const searchText = (searchParams?.query) || ''
    const category = (searchParams?.category) || ''

         const event = await getAllEvent({
           query: searchText,
           category,
            page,
            limit: 6
         })
          
         console.log(event)
     return (
        <>
         <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
             <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
                <div className="flex flex-col justify-center gap-8">
                  <h1 className="h1-bold">Host, Connect and celebrate: Your Event, Our Platform!</h1>
                   <p className="p-regular-20 md:p-regular-24 ">
                    helpful tips from 3,168+ mentors in world-class companies with our global commuinities
                   </p>
                   <Button size="lg" asChild className="button w-full sm:w-fit">
                    <Link href='#events'>Explore Now</Link>
                   </Button>
                </div>
                 <Image src="/assets/images/hero.png" width={1000} height={1000} alt="hero" className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"/>
             </div>
         </section>
          <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold">Trust by <br/> Thousands of Events</h2>
          <div className="flex w-full flex-col gap-5 md:flex-row">
              <Search/>
              <CategoryFilter/>
               
          </div>
          <Collection 
                 data={event?.data}
                 emptyTitle="No Event Found."
                  emptyStateSubtext="Come back later."
                  collectionType="All_Events"
                  limit={6}
                    page={1}
                    totalPage={2}
               />
          </section>
        </>
     )
   } 