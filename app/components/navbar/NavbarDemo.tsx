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
          <div className="text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title="BI Dashboard"
              subtitle="Features"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Intuitive visualizations and real-time analytics to help you make informed decisions quickly."
              subdescription="AlgoChurn is a platform that helps you prepare for tech interviews like never before. It is a platform that helps you prepare for tech interviews like never before."
              buttons={["AI Chat", "Management Dashboard", "Analytics"]}
              products={["EchoRay XYZ", "Why EchoRay", "What's New"]}
              link={["/web-dev", "/interface-design", "/seo",]}
            />
            <ProductItem
              title="Document Management"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
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


    <Link href="/get-started" className="flex items-center mx-16 bg-green px-4 py-2 rounded-lg text-black"> {/* Right section for Sign In button */}
    Get Started {/* Added Sign In button */}
        </Link>
      </div>


  </div>


  );
}
