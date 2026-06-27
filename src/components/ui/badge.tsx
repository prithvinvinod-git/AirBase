import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-radius-tags px-3 py-1 text-caption font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-fog-white text-muted-indigo",
        primary: "bg-surface-tinted-surface text-atlassian-blue",
        success: "bg-green-50 text-green-700",
        warning: "bg-amber-50 text-amber-700",
        destructive: "bg-red-50 text-red-700",
        outline: "border border-carbon-edge text-midnight-navy",
        dark: "bg-midnight-navy text-pure-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
