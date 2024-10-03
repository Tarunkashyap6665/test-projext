"use client"
import React from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MegaMenu from './MegaMenu';
import { navLinks } from '@/constants';
import Link from 'next/link';
import { SignedIn, SignedOut} from '@clerk/nextjs';
import { FaRobot, FaUserCircle } from 'react-icons/fa';
import { ProfileButton } from './ProfileButton';



function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1" placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      {navLinks.map((link, key) => (
        link.isMegaMenu ? (
          <MegaMenu label={link.label} menuItems={link.subItems as MegaMenuProps} key={key} />
        ) : (

          <Typography
              as="a"
              href={link.route}

              variant="h6"
              color="white"
              className="font-medium" placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined} key={key}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >
            <ListItem className="flex items-center gap-2 py-2 pr-4 hover:bg-black/10  hover:text-gray-200 active:bg-black/10 active:text-gray-200 focus:bg-black/10 focus:text-gray-200 " placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >{link.label}</ListItem>
          </Typography>

        )
      ))}


    </List>
  );
}


export function NavigationBar({user}:{user:any}) {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (<>
    <Navbar className="bg-gradient-to-r from-purple-900 to-indigo-900 border-none mx-auto max-w-full rounded-none px-4 py-3" placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <div className='max-w-screen-2xl mx-auto'>
        <div className="flex items-center justify-between text-white">


            <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <FaRobot className="text-3xl text-white" />
            <span className="text-2xl font-bold text-white italic">Artifixer</span>
          </div>
            </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <SignedIn>
              <ProfileButton user={user}/>

            </SignedIn>
            <SignedOut>
              <Link href={"/sign-in"} className="w-full bg-black/20 text-white px-4 py-2 rounded-full border-2 font-semibold hover:bg-orange-600/20 transition duration-300"><FaUserCircle className="inline-block mr-2" />Login / Sign Up</Link>

            </SignedOut>
          </div>
          <IconButton
            variant="text"
            color="white"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)} placeholder={undefined} onPointerEnter={() => { } } onPointerLeave={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <SignedIn>
              <ProfileButton user={user} showName={true}/>
            </SignedIn>
            <SignedOut>
              <Link href={"/sign-in"} className="w-full bg-white text-purple-900 px-4 py-2 text-center rounded-md font-semibold hover:bg-gray-200 transition duration-300"><FaUserCircle className="inline-block mr-2 " />Login / Sign Up</Link>
            </SignedOut>

          </div>
        </Collapse>
      </div>
    </Navbar>
  </>
  );
}