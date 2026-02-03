// Utility functions for menu items

export interface MenuItem {
  name: string
  desc?: string
  icon: string
  image: string
  price: number | { half: number | null; full: number | null }
  options?: string[] | Array<{ [key: string]: number | null }>
  [key: string]: any
}

// Format price display
export function formatPrice(
  price: number | { half?: number | null; full?: number | null } | {},
  labels?: { first?: string; second?: string }
): string {
  if (typeof price === 'number') {
    return `₹${price}`
  }
  
  if (!price || typeof price !== 'object' || Object.keys(price).length === 0) {
    return ''
  }
  
  const { half, full } = price as { half?: number | null; full?: number | null }
  const firstLabel = labels?.first || ''
  const secondLabel = labels?.second || ''
  
  if (half !== null && half !== undefined && full !== null && full !== undefined) {
    if (firstLabel && secondLabel) {
      return `₹${half} ${firstLabel} / ₹${full} ${secondLabel}`
    }
    return `₹${half} / ₹${full}`
  } else if (half !== null && half !== undefined) {
    return firstLabel ? `₹${half} ${firstLabel}` : `₹${half}`
  } else if (full !== null && full !== undefined) {
    return secondLabel ? `₹${full} ${secondLabel}` : `₹${full}`
  }
  return ''
}

// Format options display
export function formatOptions(options?: string[] | Array<{ [key: string]: number | null }> | any): Array<{ name: string; extra: number | null }> {
  if (!options || !Array.isArray(options) || options.length === 0) return []
  
  if (typeof options[0] === 'string') {
    // Simple string array
    return (options as string[]).map(opt => ({ name: opt, extra: null }))
  }
  
  // Array of objects with prices
  return (options as Array<{ [key: string]: number | null }>).map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      const key = Object.keys(opt)[0]
      return { name: key, extra: opt[key] }
    }
    return { name: String(opt), extra: null }
  })
}
