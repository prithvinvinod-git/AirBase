import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "Website scanning is not enabled in this Airbase preview.",
      status: "not_implemented",
      message: "A secure crawl service and scoring methodology must be configured before URL scans can be accepted.",
    },
    { status: 501 }
  )
}
