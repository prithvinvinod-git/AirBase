"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { formatCurrency, formatLatency, formatNumber } from "@/lib/utils"
import type { AIModel } from "@/lib/types"

interface ModelCardProps {
  model: AIModel
  featured?: boolean
  index?: number
}

export function ModelCard({ model, featured, index = 0 }: ModelCardProps) {
  const { pricing } = model

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/models/${model.slug}`}>
        <div
          className={cn(
            "group relative rounded-radius-cards bg-pure-white border border-fog-white p-5",
            "transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]",
            "flex flex-col gap-3 h-full",
            featured && "border-atlassian-blue/20"
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-radius-xl bg-surface-tinted-surface flex items-center justify-center shrink-0">
                <span className="text-caption font-bold text-atlassian-blue">
                  {model.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-caption text-muted-indigo">{model.author}</p>
                <h3 className="font-charlie-display font-medium text-subheading text-midnight-navy leading-tight">
                  {model.name}
                </h3>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="p-1.5 text-muted-indigo hover:text-red-500 hover:bg-red-50 rounded-radius-md transition-colors"
              aria-label="Save model"
            >
              <Heart className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-taxicab-yellow text-taxicab-yellow" />
            <span className="text-caption font-medium text-midnight-navy">{model.stats.avgRating}</span>
            <span className="text-caption text-muted-indigo">
              ({formatNumber(model.stats.reviewCount)})
            </span>
          </div>

          {/* Description */}
          <p className="text-caption text-muted-indigo leading-relaxed line-clamp-2">
            {model.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {model.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-[11px] px-2 py-0.5">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Pricing */}
          <div className="flex gap-4 text-caption">
            <span className="text-muted-indigo">
              Input: <span className="font-medium text-midnight-navy">{formatCurrency(pricing.input)}/{pricing.unit === "per_token" ? "k" : "req"}</span>
            </span>
            <span className="text-muted-indigo">
              Output: <span className="font-medium text-midnight-navy">{formatCurrency(pricing.output)}/{pricing.unit === "per_token" ? "k" : "req"}</span>
            </span>
          </div>

          {/* Demand + Latency */}
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-caption text-muted-indigo">Demand</span>
                <span className="text-caption font-medium text-midnight-navy">{model.demand}%</span>
              </div>
              <Progress value={model.demand} className="h-1.5" />
            </div>
            <div className="flex items-center gap-1 text-caption text-muted-indigo shrink-0">
              <Clock className="w-3 h-3" />
              {formatLatency(model.avgLatencyMs)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-1">
            <Button variant="default" size="sm" radius="full" className="flex-1 text-caption">
              Try Now
            </Button>
            <Button variant="outline" size="sm" radius="full" className="text-caption">
              Details
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
