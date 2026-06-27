"use client"

import { useState } from "react"
import { Bookmark, Scan, Clock, Settings, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelGrid } from "@/components/model/ModelGrid"
import { models } from "@/lib/mock-data"
import type { Scan as ScanType } from "@/lib/types"

export default function DashboardPage() {
  const [savedModels] = useState(models.slice(0, 3))
  const [recentScans] = useState<ScanType[]>([])

  return (
    <div className="mx-auto max-w-page-max px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-surface-tinted-surface flex items-center justify-center">
            <span className="font-charlie-display font-bold text-heading text-atlassian-blue">U</span>
          </div>
          <div>
            <h1 className="font-charlie-display font-medium text-heading text-midnight-navy">
              Dashboard
            </h1>
            <p className="text-body text-muted-indigo">
              Manage your saved models and scan history
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Saved Models", value: savedModels.length, icon: Bookmark },
            { label: "Scans Performed", value: recentScans.length, icon: Scan },
            { label: "Credits Remaining", value: 100, icon: Clock },
            { label: "Member Since", value: "2024", icon: History },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-radius-lg bg-surface-tinted-surface flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-atlassian-blue" />
                </div>
                <div>
                  <p className="text-caption text-muted-indigo">{stat.label}</p>
                  <p className="text-body font-semibold text-midnight-navy">{stat.value}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <Tabs defaultValue="saved">
        <TabsList>
          <TabsTrigger value="saved">
            <Bookmark className="w-3.5 h-3.5 mr-1.5" />
            Saved Models
          </TabsTrigger>
          <TabsTrigger value="scans">
            <Scan className="w-3.5 h-3.5 mr-1.5" />
            Scan History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-3.5 h-3.5 mr-1.5" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          {savedModels.length > 0 ? (
            <div className="mt-4">
              <ModelGrid models={savedModels} columns={3} />
            </div>
          ) : (
            <div className="text-center py-16 mt-4">
              <Bookmark className="w-12 h-12 text-muted-indigo mx-auto mb-4" />
              <p className="text-body text-muted-indigo mb-4">No saved models yet</p>
              <Button variant="outline">Browse Models</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="scans">
          {recentScans.length > 0 ? (
            <div className="space-y-3 mt-4">
              {/* Scan history items */}
            </div>
          ) : (
            <div className="text-center py-16 mt-4">
              <Scan className="w-12 h-12 text-muted-indigo mx-auto mb-4" />
              <p className="text-body text-muted-indigo mb-4">No scans performed yet</p>
              <Button variant="outline">Scan a Website</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <div className="mt-4 max-w-lg">
            <Card className="p-6">
              <h3 className="font-charlie-display font-medium text-heading-sm text-midnight-navy mb-4">
                Account Settings
              </h3>
              <p className="text-body text-muted-indigo">
                Manage your profile, API keys, and notification preferences.
              </p>
              <Button variant="outline" className="mt-4">
                Edit Profile
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
