"use client";

import React, { lazy, Suspense, useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import InfiniteScroll from "react-infinite-scroll-component";

import { randomItem } from "@swy/ui/lib";
import { Button, Input } from "@swy/ui/shadcn";

import { Hint } from "../hint";
import type { LucideName } from "../icon-block";
import { Spinner } from "../spinner";
import ColorPicker from "./color-picker";
import { useLucideIcons } from "./use-lucide-icons";

interface IconProps {
  onClick: (name: LucideName) => void;
  name: LucideName;
  color: string;
}

const Icon: React.FC<IconProps> = ({ name, color, onClick }) => {
  const LucideIcon = useMemo(() => lazy(dynamicIconImports[name]), [name]);
  return (
    <Hint asChild side="top" description={name}>
      <Button
        variant="hint"
        onClick={() => onClick(name)}
        className="size-[30px] p-0"
      >
        <Suspense>
          <LucideIcon name={name} color={color} size={20} strokeWidth={2.2} />
        </Suspense>
      </Button>
    </Hint>
  );
};

interface LucidePickerProps {
  colorPalette: Record<string, string> & { default: string };
  onSelect: (name: LucideName, color: string) => void;
}

const LucidePicker: React.FC<LucidePickerProps> = ({
  colorPalette,
  onSelect,
}) => {
  const [color, setColor] = useState<string>(colorPalette.default);
  const { isLoading, allIcons, icons, filterIcons } = useLucideIcons();

  const getRandomIcon = () => onSelect(randomItem(allIcons), color);

  return (
    <div>
      <div className="flex items-center gap-x-1.5">
        <div className="flex-1">
          <Input
            onChange={(e) => filterIcons(e.target.value)}
            placeholder="Filter..."
          />
        </div>
        <Hint asChild description="Random">
          <Button variant="secondary" size="icon-md" onClick={getRandomIcon}>
            <Shuffle size={16} />
          </Button>
        </Hint>
        <Hint asChild description="Select icon color">
          <ColorPicker
            colorPalette={colorPalette}
            color={color}
            onSelect={setColor}
          />
        </Hint>
      </div>
      <div className="text-md py-2 font-semibold text-[#858585]">Icons</div>
      <div className="mt-0 p-0">
        {isLoading && <Spinner />}
        {!isLoading && icons.length ? (
          <InfiniteScroll
            dataLength={icons.length}
            next={() => console.log("fetching next")}
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
                  onClick={(name) => onSelect(name, color)}
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
