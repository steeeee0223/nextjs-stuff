import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-sm text-sm font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-border-button hover:bg-primary/5",
        secondary:
          "border border-border-button text-icon hover:bg-primary/5 dark:text-icon-dark",
        nav: "text-icon hover:bg-primary/5 dark:text-icon-dark",
        item: "relative flex justify-normal text-primary hover:bg-primary/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:text-primary/80",
        subitem:
          "relative flex text-secondary hover:bg-primary/5 dark:text-secondary-dark",
        link: "text-primary underline-offset-4 hover:underline dark:text-icon-dark dark:text-primary/80",
        blue: "border border-border bg-blue font-medium text-white shadow-sm hover:bg-blue-hover hover:text-white",
        "soft-blue": "bg-blue/5 text-blue shadow-sm hover:bg-blue/15",
        hint: "font-medium text-muted hover:bg-primary/5 dark:text-muted-dark",
        red: "border border-red/50 text-red hover:bg-red/10 focus:bg-red/10",
        "red:fill": "bg-red text-white hover:bg-red/65 dark:hover:bg-red/35",
        white: "border border-white text-white hover:bg-primary/5",
      },
      size: {
        xs: "h-6 px-1.5 text-xs",
        sm: "h-8 px-3",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "size-9 rounded-md",
        "icon-sm": "size-5",
        "icon-md": "size-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const inputVariants = cva(
  "flex w-full border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-7 rounded-sm border-border bg-input/60 text-primary shadow-none placeholder:text-primary/45 dark:bg-input/5 dark:text-primary/80",
        /** @variant search: Inherit styles from `notion` and add padding for the icon */
        search:
          "relative h-7 rounded-sm border-border bg-input/60 pl-10 text-primary shadow-none placeholder:text-primary/45 dark:bg-input/5 dark:text-primary/80",
        shadcn:
          "h-9 rounded-md border-input bg-transparent shadow-sm placeholder:text-muted focus-visible:ring-1 focus-visible:ring-ring dark:text-muted-dark",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export type InputVariants = VariantProps<typeof inputVariants>;

export const contentVariants = cva(
  "border border-border focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        modal:
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-modal p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        popover:
          "z-50 rounded-md bg-popover shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        tab: "border-none bg-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        tooltip:
          "relative z-50 overflow-hidden border-none bg-tooltip font-medium text-white/90 shadow-md backdrop-filter-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:text-primary/80",
        shadcn: "text-popover-foreground bg-popover shadow-md",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export type ContentVariants = VariantProps<typeof contentVariants>;

export const separatorVariants = cva("-mx-1 my-1 h-px", {
  variants: {
    variant: {
      default: "bg-primary/10",
      shadcn: "bg-muted",
    },
  },
  defaultVariants: { variant: "default" },
});
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
