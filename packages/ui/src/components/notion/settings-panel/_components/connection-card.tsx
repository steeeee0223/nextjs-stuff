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
  imageUrl: string;
  title: string;
  description: string;
  value?: string;
}

export const ConnectionCard = ({
  imageUrl,
  title,
  description,
  value,
}: ConnectionCardProps) => {
  return (
    <Card
      variant="notion"
      button
      className="flex min-w-[120px] flex-col justify-between gap-3 overflow-hidden p-3"
    >
      <CardContent className="flex flex-col items-start gap-2 p-0">
        <CardHeader className="px-0 py-1">
          <img src={imageUrl} alt={value} className="size-7 rounded-md" />
        </CardHeader>
        <CardTitle className="text-sm/[1.3] font-medium">{title}</CardTitle>
        <CardDescription className="max-h-[72px] overflow-hidden  text-xs/[1.3] text-primary/65">
          {description}
        </CardDescription>
        <Badge variant="gray" size="sm" className="cursor-default uppercase">
          Link Preview
        </Badge>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="soft-blue" size="sm" className="h-7 w-full">
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};
