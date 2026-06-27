"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.8 + i * 0.1, duration: 0.5 },
  }),
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-midnight-navy">
      {/* Confetti decorative shapes */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-[#bf63f3] opacity-30 rounded-[40%_60%_50%_50%] rotate-12"
          animate={{ rotate: 12, y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 -left-10 w-48 h-48 bg-taxicab-yellow opacity-20 rounded-[30%_70%_60%_40%] -rotate-12"
          animate={{ rotate: -12, y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-atlassian-blue opacity-20 rounded-[50%_50%_40%_60%]" />
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-[#36a54a] opacity-15 rounded-[60%_40%_30%_70%] rotate-45" />
      </motion.div>

      <div className="relative mx-auto max-w-page-max px-6 py-20 md:py-32">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="dark" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              The App Store for AI Models
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-charlie-display text-display leading-display tracking-display text-pure-white mb-6"
          >
            Discover the{" "}
            <span className="text-atlassian-blue">best AI models</span>
            {" "}in one place
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-body text-ash-gray leading-body max-w-xl mb-8"
          >
            Browse, compare, test, and deploy AI models from hundreds of providers.
            One marketplace to rule them all.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button size="lg" radius="full" asChild>
              <Link href="/models">
                Browse Models
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" radius="full" className="border-pure-white/20 text-pure-white hover:bg-pure-white/10" asChild>
              <Link href="/scanner">
                Scan Your Site
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-pure-white/10"
          >
            {[
              { label: "Models", value: "200+" },
              { label: "Providers", value: "50+" },
              { label: "Daily Queries", value: "10M+" },
              { label: "Avg Rating", value: "4.7" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="font-charlie-display font-bold text-heading-sm text-pure-white">
                  {stat.value}
                </p>
                <p className="text-caption text-ash-gray">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
