import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-muted-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",  //  Disabled
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",  //  Focus
        "selection:bg-primary selection:text-primary-foreground",  //  Selection
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",  //  Aria invalid
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",  //  File
        className
      )}
      {...props} />
  );
}

export { Input }
