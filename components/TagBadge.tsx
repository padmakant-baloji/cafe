'use client'

import { getTagConfig } from '@/lib/tagUtils'

interface TagBadgeProps {
  tag: string
  className?: string
}

export default function TagBadge({ tag, className = '' }: TagBadgeProps) {
  const config = getTagConfig(tag)
  const isPopular = tag === 'popular'
  
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${config.className} ${isPopular ? 'animate-pulse' : ''} ${className}`}
    >
      {config.icon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </span>
  )
}
