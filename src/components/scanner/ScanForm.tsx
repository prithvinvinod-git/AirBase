"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const scanSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .transform((url) => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`
      }
      return url
    }),
})

type ScanFormData = z.infer<typeof scanSchema>

interface ScanFormProps {
  onScan: (url: string) => void
  isLoading: boolean
}

export function ScanForm({ onScan, isLoading }: ScanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScanFormData>({
    resolver: zodResolver(scanSchema),
  })

  const onSubmit = (data: ScanFormData) => {
    onScan(data.url)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-indigo" />
          <Input
            {...register("url")}
            placeholder="Enter your website URL (e.g., example.com)"
            className="pl-11 h-12"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" radius="full" className="h-12 shrink-0" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Scan Now
            </>
          )}
        </Button>
      </div>
      {errors.url && (
        <p className="mt-2 text-caption text-red-500">{errors.url.message}</p>
      )}
    </form>
  )
}
