import Image from "next/image";
import Link from "next/link";
import React from "react";

import NavItems from "./NavItems";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Header = ()=>{
    return (
        <header className="w-full-border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/">
                    <Image src={'assets/images/logo.svg'} width={128} height={32} alt="logo"/>
                </Link>

                <nav className="md:flex-between hidden w-full max-w-xs">
                    <NavItems/>
                </nav>

                <div className="flex w-32 justify-end gap-3">
                    <MobileNav/>
                </div>
            </div>
        </header>
    )
}

export default Header
