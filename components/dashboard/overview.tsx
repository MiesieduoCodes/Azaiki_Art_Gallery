"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Loader2 } from "lucide-react"

// Mock data - in a real app, this would come from Firebase
const mockData = [
  { name: "Jan", total: 580 },
  { name: "Feb", total: 690 },
  { name: "Mar", total: 1100 },
  { name: "Apr", total: 1200 },
  { name: "May", total: 900 },
  { name: "Jun", total: 1500 },
  { name: "Jul", total: 1800 },
  { name: "Aug", total: 1600 },
  { name: "Sep", total: 1200 },
  { name: "Oct", total: 1400 },
  { name: "Nov", total: 1100 },
  { name: "Dec", total: 1700 },
]

export function Overview() {
  const [data, setData] = useState<typeof mockData>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this from Firebase
        // const data = await getViewsData();
        setData(mockData)
      } catch (error) {
        console.error("Error fetching overview data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          formatter={(value) => [`${value} views`, "Views"]}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="hover:fill-primary/80" />
      </BarChart>
    </ResponsiveContainer>
  )
}

