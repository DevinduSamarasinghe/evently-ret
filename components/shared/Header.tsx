import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

// Usage of custom classNames.
// In globals.css file: .wrapper : custom class of tailwind elements 

const Header = () => {
    return (
        <header className='w-full border-b'>
            {/* custom class of tailwind elements */}
            <div className='wrapper flex items-center justify-between'>
                <Link href={'/'} className='w-36'>
                    <Image src={'/assets/images/logo.svg'} width={128} height={38}
                        alt={'Evently Logo'} />
                </Link>

                {/* This remains in a different SignedIn cause of the divs */}
                <SignedIn>
                    <nav className='md:flex-between hidden w-full max-w-xs'>
                        <NavItems/>
                    </nav>
                    
                </SignedIn>

                <div className='flex w-32 justify-end gap-3'>
                    <SignedIn>
                        <UserButton afterSignOutUrl='/' />
                        <MobileNav/>
                    </SignedIn>

                    {/* SignedOut is a conditional to check if there is a session or not  */}
                    <SignedOut>
                        {/* asChild parameter helps us actually click the link instead of the button trigger */}
                        <Button asChild className='rounded-full' size={'lg'}>
                            <Link href={'/sign-in'}>Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header