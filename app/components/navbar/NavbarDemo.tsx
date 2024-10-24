"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center ">
      <Navbar className="top-0 z-50 border-b border-zinc-600" />

    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("flex top-10 inset-x-0 w-full mx-auto h-20 z-50 bg-gradient-to-b from-zinc-600/[0.5] to-zinc-500/[0.5] ", className)}
    >
  <div className="flex-grow flex justify-between items-center text-lg">
  <Link href="/" className="flex items-center mx-16"> {/* Logo on the left */}
    <Image src="https://cdn.jsdelivr.net/gh/Ethereumistic/echo-ray-assets/logo/v2-logo.png" 
            alt="logo" 
            width={200} 
            height={100}
            className="" />
  </Link>
    <Menu setActive={setActive}>
      <div className="flex  justify-center space-x-24">
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products" >
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Business Intelligence"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Document Management"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </div>
    </Menu>


    <Link href="/login" className="flex items-center mx-16 bg-green px-4 py-2 rounded-lg text-black"> {/* Right section for Sign In button */}
    Sign In {/* Added Sign In button */}
        </Link>
      </div>


  </div>


  );
}
