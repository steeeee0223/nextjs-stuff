"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Shuffle } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR, { type Fetcher } from "swr";

import { randomItem } from "@swy/ui/lib";
import { Button, Input } from "@swy/ui/shadcn";

import { COLOR } from "../../../constants/colors";
import { Hint } from "../hint";
import { Spinner } from "../spinner";
import ColorPicker from "./color-picker";
import type { IconTag, LucideName } from "./index.types";

interface IconProps {
  onClick?: (name: LucideName) => void;
  name: LucideName;
  color: string;
}

const Icon = ({ name, color, onClick }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], { ssr: false });
  const handleClick = () => onClick?.(name);

  return (
    <Hint asChild side="top" description={name}>
      <Button variant="hint" onClick={handleClick} className="size-[30px] p-0">
        <LucideIcon name={name} color={color} size={20} strokeWidth={2.2} />
      </Button>
    </Hint>
  );
};

interface LucidePickerProps {
  onSelect?: (name: LucideName, color?: string) => void;
  onColorChange?: (color?: string) => void;
}

const LucidePicker = ({ onSelect, onColorChange }: LucidePickerProps) => {
  const allIcons = useMemo<LucideName[]>(
    () => Object.keys(dynamicIconImports) as LucideName[],
    [],
  );
  const [search, setSearch] = useState("");
  const [icons, setIcons] = useState<LucideName[]>(allIcons);
  const [color, setColor] = useState<string>(COLOR.default);

  const fetcher: Fetcher<IconTag[], string> = async (_key) => {
    console.log(`fetching lucide icons`);
    const res = await fetch(`https://lucide.dev/api/tags`);
    const data = (await res.json()) as Record<string, string[]>;
    return Object.entries(data) as IconTag[];
  };

  const { data, isLoading } = useSWR("lucide:tags", fetcher, {
    revalidateOnFocus: false,
  });

  const handleRandom = () => onSelect?.(randomItem(allIcons), color);
  const handleColor = (color: string) => {
    setColor(color);
    onColorChange?.(color);
  };

  useEffect(() => {
    setIcons(
      search.length && data
        ? data
            .filter(([name, tags]) =>
              search
                .toLowerCase()
                .split(" ")
                .some((keyword) =>
                  [...name.split("-"), ...tags].includes(keyword),
                ),
            )
            .map(([name]) => name)
        : allIcons,
    );
  }, [search, data, allIcons]);

  return (
    <div>
      <div className="flex items-center gap-x-1.5">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter..."
          />
        </div>
        <Hint asChild description="Random">
          <Button variant="secondary" size="icon-md" onClick={handleRandom}>
            <Shuffle size={16} />
          </Button>
        </Hint>
        <Hint asChild description="Select icon color">
          <ColorPicker
            defaultColor={color}
            colors={COLOR}
            onSelect={handleColor}
          />
        </Hint>
      </div>
      <div className="text-md py-2 font-semibold text-[#858585]">Icons</div>
      <div className="mt-0 p-0">
        {(!data || isLoading) && <Spinner />}
        {data && icons.length ? (
          <InfiniteScroll
            dataLength={icons.length}
            next={() => console.log(`fetching next`)}
            hasMore={false}
            height={210}
            loader={null}
          >
            <div className="grid grid-cols-12 gap-0">
              {icons.map((name, i) => (
                <Icon
                  key={i}
                  name={name}
                  color={color}
                  onClick={(name) => onSelect?.(name, color)}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <p className="hidden py-2 text-center text-xs text-muted last:block dark:text-muted-dark">
            No icons found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LucidePicker;
