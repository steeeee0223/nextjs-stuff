import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/components";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <Popover>
          <PopoverTrigger>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
