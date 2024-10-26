"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer  text-lg transition-all duration-700 hover:bg-gradient-to-b from-zinc-400/[0.5] to-zinc-500/[0.5] px-4 py-2 rounded-lg"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.05rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-gradient-to-b from-zinc-500/[0.5] to-zinc-600/[0.5] border-t border-zinc-600 rounded-b-2xl overflow-hidden z-10"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full   flex justify-center space-x-4 px-8 py-6 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  subtitle,
  description,
  subdescription,
  href,
  src,
  links,
  buttons,
  products,
}: {
  title: string;
  subtitle?: string;
  description: string;
  subdescription?: string;
  href: string;
  src: string;
  links?: string[];
  buttons?: string[]; // Accept an array of button labels
  products?: string[]; // Accept an array of button labels

    
}) => {
  return (
    <div>
    <div className="flex space-x-2 ">

      <div>
        <div className="flex flex-row ">

            <div className="flex flex-col">
                <h4 className="text-xl font-bold mb-1 text-green mx-12">
                {title}
                </h4>

                {products && links && products.map((productLabel, index) => (
                <Link key={index} href={links[index]} className="text-white text-sm flex-col flex rounded-lg ">
                  <button className="inline-flex mx-auto hover:bg-zinc-500/[0.5] rounded-lg">
                    <p className="px-4 py-2 whitespace-nowrap">
                      {productLabel}
                    </p>
                  </button>
                </Link>
              ))}
            </div>

            <div>
                <h4 className="text-xl font-bold mb-1 text-green mx-12">
                {subtitle}
                </h4>
                {buttons && links && buttons.map((buttonLabel, index) => (
                <Link key={index} href={links[index]} className="text-white text-sm flex-col flex rounded-lg ">
                  <button className="inline-flex mx-auto hover:bg-zinc-500/[0.5] rounded-lg">
                    <p className="px-4 py-2 whitespace-nowrap">
                      {buttonLabel}
                    </p>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={src}
          width={280}
          height={140}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
      </div>
    </div>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-white dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
