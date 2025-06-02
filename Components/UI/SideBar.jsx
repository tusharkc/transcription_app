"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import appLogo from "../../assets/branding/appLogo.svg";
import { sideBarMenuData } from "../data/sideBarMenudata";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#0E131B]">
      <Image
        src={appLogo.src}
        width={24}
        height={24}
        alt="Logo"
        className="m-2.5 border-b-2 border-b-[#FFFFFF29]"
      />

      <div className="flex flex-col items-center justify-center">
        {sideBarMenuData.map((menuItem) => {
          return (
            <React.Fragment key={menuItem.id}>
              <div className="relative w-full">
                <div
                  className={`w-0.5 bg-[#2B6AF5] absolute top-0 bottom-0 ${
                    pathname == menuItem.path
                  }`}
                ></div>
                <Link
                  href={menuItem.path}
                  className="mt-2 flex items-center justify-center"
                >
                  {menuItem.icon}
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
