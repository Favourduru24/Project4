"use client"
import Image from 'next/image'
import Link from 'next/link'
import  { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import {signIn, signOut, getProviders, useSession} from "next-auth/react"

const Header = () => {
   

    const [providers, setProviders] = useState(null)
    const {data: session} = useSession()

     
     
     useEffect(() => {
    const setUpProvider = async() => {
     const response = await getProviders()
      setProviders(response)
    }
      setUpProvider()
     },[])

  return (
    <header className='w-full border-b px-5 sm:px-10'>
      <div className='wrapper flex items-center justify-between'>
          <Link href="/" className='w-36'>
           <Image src="/assets/images/logo.svg" width={128} height={38} alt='event logo'/>
          </Link>
               <nav className='md:flex-between hidden w-full max-w-xs'>
                 <NavItems/>
               </nav>
                 {session?.user ?
                  <div className='flex w-32 justify-end gap-3'>
                  <MobileNav isUserLoggedIn={session}/>
                 <Button className="rounded-full max-sm:w-20 h-12" size="lg" onClick={signOut} >
                    Signout
                 </Button>
                 <Image src={session?.user?.image} width={50} height={10} alt='event logo' className='md:flex-between hidden rounded-full'/>
                  
           </div>
           :
            (
                <>
               { providers && Object.values(providers).map((provider) => (
               <div className='flex w-32 justify-end gap-3' key={provider.name}>
               <MobileNav/>
               <Button className="rounded-full" size="lg" onClick={() => signIn(provider.id)} >
                 Login
                </Button>
               </div>
               ))} 
              </>
            )}
      </div>
    </header>
  )
}

export default Header