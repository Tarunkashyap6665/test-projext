"use client"
import { ChevronDownIcon} from '@heroicons/react/24/solid';
import { Collapse, ListItem, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react'


const MegaMenu = ({ label, menuItems }: { label: string, menuItems: MegaMenuProps }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


  const renderItems = menuItems.map(
    ({ title, route, icon, description }, key) => (
      <Link href={route} key={key}>
        <MenuItem className="flex items-center  gap-3 hover:bg-black/10 active:bg-black/10" placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="white"
              className="flex items-center font-bold" placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-sm !font-medium text-gray-200" placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="h6" color='white' className="font-medium" placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-white focus:bg-black/10 active:bg-black/10 hover:bg-black/10 hover:text-gray-200"
              style={{ backgroundColor: isMenuOpen ? "rgb(0 0 0 / 0.1)" : "rgb(0 0 0 / 0.0)", color: isMenuOpen ? "rgb(238 238 238)" : "rgb(255 255 255)" }}
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)} placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
              {label}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden bg-transparent bg-gradient-to-r from-purple-700/90 to-indigo-700/90 border-none max-w-screen-xl  lg:block rounded-none" placeholder={undefined} onPointerEnter={() => { }} onPointerLeave={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className='absolute bg-black/20 -z-10  inset-0'>
          </div>

          <ul className="grid grid-cols-3  gap-y-2 outline-none outline-0 ">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen} className='bg-black/20 rounded-md  '>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

export default MegaMenu

