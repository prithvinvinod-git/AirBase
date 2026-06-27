import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlassian-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-atlassian-blue text-pure-white hover:bg-atlassian-blue/90",
        destructive: "bg-red-500 text-pure-white hover:bg-red-500/90",
        outline: "border border-carbon-edge bg-transparent hover:bg-fog-white",
        secondary: "bg-fog-white text-midnight-navy hover:bg-fog-white/80",
        ghost: "hover:bg-fog-white text-midnight-navy",
        link: "text-atlassian-blue underline-offset-4 hover:underline",
        dark: "bg-midnight-navy text-pure-white hover:bg-midnight-navy/90",
        yellow: "bg-taxicab-yellow text-midnight-navy hover:bg-taxicab-yellow/90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-caption",
        lg: "h-12 px-8 text-subheading",
        xl: "h-14 px-10 text-subheading",
        icon: "h-10 w-10",
        pill: "h-10 px-6 rounded-full",
      },
      radius: {
        default: "rounded-radius-buttons",
        full: "rounded-full",
        none: "rounded-none",
        sm: "rounded-radius-sm",
        md: "rounded-radius-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
