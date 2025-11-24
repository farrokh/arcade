'use client'

import { useState } from 'react'
import { Clock, Calendar, CalendarRange } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface SignupChartProps {
  data24h: Array<{
    date: string
    count: number
  }>
  data30d: Array<{
    date: string
    count: number
  }>
  data6m: Array<{
    date: string
    count: number
  }>
}

type TimeRange = '24h' | '30d' | '6m'

const chartConfig = {
  count: {
    label: 'Signups',
    color: 'hsl(0, 0%, 100%)',
  },
}

export function SignupChart({ data24h, data30d, data6m }: SignupChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h')
  
  const rawData = timeRange === '24h' ? data24h : timeRange === '30d' ? data30d : data6m

  const getTitle = () => {
    switch (timeRange) {
      case '24h': return 'Last 24 Hours'
      case '30d': return 'Last 30 Days'
      case '6m': return 'Last 6 Months'
    }
  }

  const formatXAxis = (value: string) => {
    const d = new Date(value)
    if (timeRange === '24h') {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
    } else if (timeRange === '30d') {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const formatTooltipLabel = (value: string) => {
    const d = new Date(value)
    if (timeRange === '24h') {
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', hour12: true })
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  // Prepare chart data with labels
  const chartData = rawData.map((item, index) => {
    const label = formatXAxis(item.date)
    // For 30d and 6m, show fewer labels to avoid crowding
    const shouldShowLabel = 
      timeRange === '24h' ? index % 3 === 0 :
      timeRange === '30d' ? index % 5 === 0 :
      index % 4 === 0
    
    return {
      ...item,
      label: label,
      displayLabel: shouldShowLabel ? label : '',
    }
  })

  const totalSignups = rawData.reduce((sum, d) => sum + d.count, 0)
  const avgPerPeriod = (totalSignups / Math.max(rawData.length, 1)).toFixed(1)
  const maxCount = Math.max(...rawData.map(d => d.count), 1) // Ensure at least 1 for Y-axis

  if (rawData.length === 0) {
    return (
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-md font-mono text-white">Signup Timeline</h2>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>
        <div className="text-center py-12 text-gray-400">No signup data available</div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 flex-col">
          <h2 className="text-md font-mono text-white">Signup Timeline</h2>
          <span className="text-xs font-mono text-white">{getTitle()}</span>
        </div>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>
      
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.4)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatXAxis}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis
            stroke="rgba(255,255,255,0.4)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toString()}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value, payload) => {
                  if (payload && payload[0]) {
                    return formatTooltipLabel(payload[0].payload.date)
                  }
                  return value
                }}
              />
            }
            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
          />
          <Bar
            dataKey="count"
            fill="hsl(0, 0%, 100%)"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ChartContainer>

      {/* Info message for sparse data */}
      {timeRange === '6m' && totalSignups > 0 && chartData.filter(d => d.count > 0).length < 5 && (
        <div className="mt-4 text-sm text-gray-400 bg-zinc-800/30 border border-white/10 rounded-lg p-3">
          💡 Tip: All signups are grouped by week. If signups happened recently, they may appear in the same week.
        </div>
      )}

      {/* Summary stats */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
        <div>
          <div className="text-gray-400 text-sm">Total Signups</div>
          <div className="text-white text-2xl font-bold">{totalSignups}</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">
            Average/{timeRange === '24h' ? 'Hour' : timeRange === '30d' ? 'Day' : 'Week'}
          </div>
          <div className="text-white text-2xl font-bold">{avgPerPeriod}</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">
            Peak {timeRange === '24h' ? 'Hour' : timeRange === '30d' ? 'Day' : 'Week'}
          </div>
          <div className="text-white text-2xl font-bold">{maxCount}</div>
        </div>
      </div>
    </div>
  )
}

function TimeRangeSelector({ selected, onChange }: { selected: TimeRange; onChange: (range: TimeRange) => void }) {
  return (
    <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-lg">
      <button
        onClick={() => onChange('24h')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
          selected === '24h' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        <Clock className="w-4 h-4" />
        24h
      </button>
      <button
        onClick={() => onChange('30d')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
          selected === '30d' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        <Calendar className="w-4 h-4" />
        30d
      </button>
      <button
        onClick={() => onChange('6m')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
          selected === '6m' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        <CalendarRange className="w-4 h-4" />
        6m
      </button>
    </div>
  )
}
