"use client";

import { useTranslation } from "@swy/i18n";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ConnectionCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  onConnect?: () => Promise<void>;
}

export const ConnectionCard = ({
  id,
  imageUrl,
  title,
  description,
  tags,
  onConnect,
}: ConnectionCardProps) => {
  /** i18n */
  const { t } = useTranslation("settings");
  const connectText = t("my-connections.discover.buttons.connect");

  return (
    <Card
      asButton
      className="flex min-w-[120px] flex-col justify-between gap-3 overflow-hidden p-3"
    >
      <CardContent className="flex flex-col items-start gap-2">
        <CardHeader className="px-0 py-1">
          <img src={imageUrl} alt={id} className="size-7 rounded-md" />
        </CardHeader>
        <CardTitle className="text-sm/[1.3] font-medium">{title}</CardTitle>
        <CardDescription className="max-h-[72px] overflow-hidden text-xs/[1.3] text-secondary dark:text-secondary-dark">
          {description}
        </CardDescription>
        <div className="flex gap-1">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="gray"
              size="sm"
              className="cursor-default uppercase"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          variant="soft-blue"
          size="sm"
          className="h-7 w-full"
          onClick={onConnect}
        >
          {connectText}
        </Button>
      </CardFooter>
    </Card>
  );
};
