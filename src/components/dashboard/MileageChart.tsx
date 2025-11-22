'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface Transaction {
  amount: number
  created_at: string
}

export function MileageChart({ transactions }: { transactions: Transaction[] }) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, value: number, date: string } | null>(null)

  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return []

    // Sort transactions by date (oldest first)
    const sorted = [...transactions].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )

    let runningTotal = 0
    return sorted.map(t => {
      runningTotal += t.amount
      return {
        date: t.created_at,
        value: runningTotal
      }
    })
  }, [transactions])

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full bg-zinc-900/50 border border-white/10 rounded-3xl flex items-center justify-center text-zinc-500">
        No data available yet
      </div>
    )
  }

  // Chart dimensions and padding
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const width = 800
  const height = 300
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Scales
  const maxValue = Math.max(...data.map(d => d.value)) * 1.1 // Add 10% headroom
  const timeStart = new Date(data[0].date).getTime()
  const timeEnd = new Date(data[data.length - 1].date).getTime()
  const timeRange = timeEnd - timeStart || 1 // Avoid division by zero

  const getX = (date: string) => {
    const t = new Date(date).getTime()
    return padding.left + ((t - timeStart) / timeRange) * chartWidth
  }

  const getY = (value: number) => {
    return height - padding.bottom - (value / maxValue) * chartHeight
  }

  // Generate path
  const pathD = data.length > 1 
    ? `M ${getX(data[0].date)},${getY(data[0].value)} ` + 
      data.slice(1).map(d => `L ${getX(d.date)},${getY(d.value)}`).join(' ')
    : `M ${padding.left},${height - padding.bottom} L ${width - padding.right},${height - padding.bottom}` // Flat line if 1 point

  // Generate area path (close the loop)
  const areaD = `${pathD} L ${getX(data[data.length - 1].date)},${height - padding.bottom} L ${getX(data[0].date)},${height - padding.bottom} Z`

  return (
    <div className="w-full bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl mb-8">
      <h3 className="text-lg font-semibold text-white mb-6">Mileage Growth</h3>
      
      <div className="relative w-full aspect-[8/3] min-h-[250px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines (Y-axis) */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = height - padding.bottom - (tick * chartHeight)
            return (
              <g key={tick}>
                <line 
                  x1={padding.left} 
                  y1={y} 
                  x2={width - padding.right} 
                  y2={y} 
                  stroke="#3f3f46" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                  opacity="0.3"
                />
                <text 
                  x={padding.left - 10} 
                  y={y + 4} 
                  textAnchor="end" 
                  className="fill-zinc-500 text-[10px] font-mono"
                >
                  {Math.round(maxValue * tick)}
                </text>
              </g>
            )
          })}

          {/* Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Interactive Points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={getX(d.date)}
              cy={getY(d.value)}
              r="6"
              fill="transparent"
              className="cursor-pointer hover:fill-emerald-500/20"
              onMouseEnter={() => setHoveredPoint({ 
                x: getX(d.date), 
                y: getY(d.value), 
                value: d.value, 
                date: d.date 
              })}
            />
          ))}

          {/* Hover Tooltip Indicator */}
          {hoveredPoint && (
            <g>
              <circle 
                cx={hoveredPoint.x} 
                cy={hoveredPoint.y} 
                r="4" 
                fill="#10b981" 
                stroke="white" 
                strokeWidth="2" 
              />
              <line 
                x1={hoveredPoint.x} 
                y1={hoveredPoint.y} 
                x2={hoveredPoint.x} 
                y2={height - padding.bottom} 
                stroke="#10b981" 
                strokeWidth="1" 
                strokeDasharray="2 2" 
                opacity="0.5" 
              />
            </g>
          )}
        </svg>

        {/* HTML Tooltip Overlay */}
        {hoveredPoint && (
          <div 
            className="absolute pointer-events-none bg-zinc-900 border border-white/10 rounded-lg p-3 shadow-xl z-10"
            style={{ 
              left: `${(hoveredPoint.x / width) * 100}%`, 
              top: `${(hoveredPoint.y / height) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="text-xs text-zinc-400 mb-1 font-mono">
              {format(new Date(hoveredPoint.date), 'MMM d, yyyy')}
            </div>
            <div className="text-sm font-bold text-white">
              {hoveredPoint.value.toLocaleString()} miles
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
