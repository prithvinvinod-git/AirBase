import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-radius-inputs border border-carbon-edge bg-pure-white px-4 py-2 text-body text-midnight-navy",
          "placeholder:text-muted-indigo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlassian-blue focus-visible:border-atlassian-blue",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
