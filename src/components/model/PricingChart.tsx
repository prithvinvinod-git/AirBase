"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jun 1", input: 0.010, output: 0.030 },
  { date: "Jun 5", input: 0.010, output: 0.030 },
  { date: "Jun 8", input: 0.009, output: 0.028 },
  { date: "Jun 12", input: 0.010, output: 0.030 },
  { date: "Jun 15", input: 0.011, output: 0.032 },
  { date: "Jun 18", input: 0.010, output: 0.030 },
  { date: "Jun 22", input: 0.010, output: 0.030 },
  { date: "Jun 27", input: 0.010, output: 0.030 },
]

export function PricingChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="inputGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1868db" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1868db" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f2" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#42526e" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#42526e" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v.toFixed(3)}`} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #f0f1f2",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="input" stroke="#1868db" strokeWidth={2} fill="url(#inputGradient)" name="Input Price" />
          <Area type="monotone" dataKey="output" stroke="#8b5cf6" strokeWidth={2} fill="url(#outputGradient)" name="Output Price" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
