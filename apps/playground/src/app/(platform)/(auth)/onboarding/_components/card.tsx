/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import Image from "next/image";

import { cn } from "@swy/ui/lib";

export interface CardProps {
  id: number;
  checked: boolean;
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export const Card = ({
  id,
  checked,
  image,
  title,
  description,
  onClick,
}: CardProps) => {
  return (
    <div
      id={`${id}`}
      role="button"
      tabIndex={0}
      className={cn(
        "relative m-3 h-[280px] w-[230px] cursor-pointer select-none items-center justify-center whitespace-normal rounded-md border border-primary/20 bg-white py-10 text-center text-sm/[1.2] opacity-70 hover:opacity-100",
        checked && "border-2 border-blue opacity-100",
      )}
      onClick={onClick}
    >
      <Image
        src="https://www.notion.so/images/onboarding/unchecked.svg"
        alt=""
        className={cn("absolute right-3 top-3", checked && "hidden")}
        height={24}
        width={24}
      />
      <Image
        src="https://www.notion.so/images/onboarding/checked.svg"
        alt=""
        className={cn("absolute right-3 top-3", !checked && "hidden")}
        height={24}
        width={24}
      />
      <div className="flex h-[90px] justify-center">
        <Image src={image} alt="" className="h-full" />
      </div>
      <div className="m-4 flex-grow basis-full">
        <header className="mt-[30px] text-lg font-semibold text-black">
          {title}
        </header>
        <p className="mb-2 mt-3 text-sm/snug text-black/70">{description}</p>
      </div>
    </div>
  );
};
