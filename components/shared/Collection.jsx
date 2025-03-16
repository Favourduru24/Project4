import Card from "./Card";
import Pagination from "./Pagination";

const Collection = ({data, emptyTitle, emptyStateSubtext, page, collectionType, limit, totalPage, urlParamName}) => {
  return (
    <>
     {data?.length > 0 ? (
           <div className="flex flex-col items-center gap-5 grid">
             <ul className="gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(305px,1fr))]">
                 {data?.map((event) => {
                         const hasOrderLink = collectionType === 'Events_Organized'
                        const hidePrice = collectionType === 'My_Tickets';

                         return (
                            <li key={event._id} className="flex justify-center">
                                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
                            </li>
                         )
                 })}
             </ul>
              {totalPage > 1 && <Pagination urlParamName={urlParamName} page={page} totalPage={totalPage}/> }
           </div>
     ) : (
         <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
            <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
            <p className="p-reguler-14">{emptyStateSubtext}</p>
         </div>
     )}
    </>
  )
}

export default Collection