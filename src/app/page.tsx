import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel"
import { TrendingRow } from "@/components/home/TrendingRow"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { BrowseByCategory } from "@/components/home/BrowseByCategory"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCarousel />
      <TrendingRow />
      <CategoryGrid />
      <BrowseByCategory />
    </>
  )
}
