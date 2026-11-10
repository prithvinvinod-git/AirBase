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
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-blue-600" />Input sample</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-violet-500" />Output sample</span><span className="text-amber-700">Illustrative series · not model-specific</span></div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="inputGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4361ee" stopOpacity={0.25} /><stop offset="95%" stopColor="#4361ee" stopOpacity={0} /></linearGradient>
              <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7ebf2" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#66748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#66748b" }} axisLine={false} tickLine={false} tickFormatter={(value: number) => `$${value.toFixed(3)}`} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e7ebf2", borderRadius: "12px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="input" stroke="#4361ee" strokeWidth={2} fill="url(#inputGradient)" name="Input sample" />
            <Area type="monotone" dataKey="output" stroke="#8b5cf6" strokeWidth={2} fill="url(#outputGradient)" name="Output sample" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
