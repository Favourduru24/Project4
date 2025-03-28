import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='flex-center max-w-7xl lg:mx-auto p-5  xl:px-0 w-full flex-between flex-col gap-4 p-5 text-center sm:flex-row px-5 sm:px-10 xl:px-10 2xl:px-0'>
       <Link href='/'>
         <Image src="/assets/images/logo.svg" width={128} height={38} alt='logo'/>
       </Link>

        <p className='font-poppins'>2023 Evently. All Right reserve.</p>
        </div>
    </footer>
  )
}

export default Footer