'use client'

export function UserAvatar({ user, label, isSmall = false }: { user: any, label: string, isSmall?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 w-12">
      {user.avatar_url ? (
        <img 
          src={user.avatar_url} 
          alt="" 
          className={`${isSmall ? 'w-6 h-6' : 'w-8 h-8'} rounded-full border border-zinc-700`} 
        />
      ) : (
        <div className={`${isSmall ? 'w-6 h-6 text-[8px]' : 'w-8 h-8 text-[10px]'} rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400`}>
          {(user.email || '?')[0].toUpperCase()}
        </div>
      )}
      <span className="text-[9px] text-zinc-400 truncate w-full text-center">
        {label}
      </span>
    </div>
  )
}
