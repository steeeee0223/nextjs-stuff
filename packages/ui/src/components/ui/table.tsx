import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tableVariants = cva("w-full", {
  variants: {
    variant: {
      default: "caption-bottom text-sm",
      notion: "border-y border-y-primary/10 text-[13px]",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant, className }))}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const tHeaderVariants = cva("", {
  variants: {
    variant: {
      default: "[&_tr]:border-b",
      notion: "",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tHeaderVariants> {}
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tHeaderVariants({ variant, className }))}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const tBodyVariants = cva("", {
  variants: {
    variant: {
      default: "[&_tr:last-child]:border-0",
      notion: "",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tBodyVariants> {}
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tBodyVariants({ variant, className }))}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const tRowVariants = cva("", {
  variants: {
    variant: {
      default:
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      notion: "border-t border-t-primary/10",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tRowVariants> {}
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tRowVariants({ variant, className }))}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const tHeadVariants = cva("text-left", {
  variants: {
    variant: {
      default:
        "h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      notion: "py-2",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableHeadProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tHeadVariants> {}
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, variant, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tHeadVariants({ variant, className }))}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const tCellVariants = cva("", {
  variants: {
    variant: {
      default: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      notion: "py-2",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tCellVariants> {}
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, variant, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tCellVariants({ variant, className }))}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
