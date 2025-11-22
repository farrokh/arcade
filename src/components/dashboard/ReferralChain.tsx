'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserAvatar } from '../UserAvatar'

export function ReferralChain({ path, currentUser }: { path: any[], currentUser: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const fullPath = [currentUser, ...path]
  
  // If there are no intermediate nodes (just Head -> Tail), show expanded by default and disable interaction
  if (fullPath.length <= 2) {
    return (
      <div className="flex items-start gap-0 overflow-x-auto py-2 no-scrollbar">
        {fullPath.map((user, idx, arr) => (
          <div key={idx} className="flex items-start">
            <UserAvatar 
              user={user} 
              label={idx === 0 ? 'You' : user.full_name || user.email.split('@')[0]} 
            />
            {idx < arr.length - 1 && (
              <div className="w-4 border-t border-dashed border-zinc-700 mx-0 mt-[16px]" />
            )}
          </div>
        ))}
      </div>
    )
  }

  const head = fullPath[0]
  const tail = fullPath[fullPath.length - 1]
  const hiddenCount = fullPath.length - 2
  const restOfPath = fullPath.slice(1)

  return (
    <div className="flex items-start">
      {/* Static Head */}
      <UserAvatar user={head} label="You" />

      {/* Expandable Section */}
      <div 
        className="flex items-start cursor-pointer group/chain"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div 
          layout 
          className="flex items-start"
          initial={false}
        >
          {!isExpanded ? (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-start"
            >
               <div className="flex items-center mt-[4px]">
                 <div className="h-[1px] w-3 border-t border-dashed border-zinc-700 group-hover/chain:border-zinc-500 transition-colors" />
                 <div className="w-6 h-6 rounded-full bg-zinc-900/80 border border-zinc-700 group-hover/chain:border-zinc-500 group-hover/chain:bg-zinc-800 transition-all flex items-center justify-center z-10 -mx-1">
                   <span className="text-[9px] text-zinc-400 font-mono font-medium">+{hiddenCount}</span>
                 </div>
                 <div className="h-[1px] w-3 border-t border-dashed border-zinc-700 group-hover/chain:border-zinc-500 transition-colors" />
               </div>
               <UserAvatar user={tail} label={tail.full_name || tail.email.split('@')[0]} />
            </motion.div>
          ) : (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start"
            >
              {restOfPath.map((user, idx) => (
                 <div key={idx} className="flex items-start">
                   {/* Connector */}
                   <div className="w-4 border-t border-dashed border-zinc-700 mx-0 mt-[16px]" />
                   
                   <UserAvatar 
                     user={user} 
                     label={user.full_name || user.email.split('@')[0]} 
                   />
                 </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
