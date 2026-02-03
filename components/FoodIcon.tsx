'use client'

interface FoodIconProps {
  type: string
  className?: string
  useGif?: boolean
}

export default function FoodIcon({ type, className = '', useGif = false }: FoodIconProps) {
  // Emoji fallback map
  const emojiMap: Record<string, string> = {
    // Soups
    'soup-manchow': '🍲',
    'soup-tomato': '🍅',
    'soup-mushroom': '🍄',
    'soup-garlic': '🧄',
    
    // Quick Bites
    'gobi-manchurian': '🥦',
    'paneer-bites': '🧀',
    'manchurian-pops': '🥟',
    'corn-crunch': '🌽',
    'butter-corn': '🌽',
    'corn-balls': '🧀',
    'fries': '🍟',
    'potato-wedges': '🥔',
    'smiley-fries': '😊',
    'nuggets': '🥔',
    
    // Rice & Noodles
    'rice-noodles': '🍜',
    'schezwan-rice': '🍛',
    'chilli-garlic-rice': '🍛',
    'fried-rice': '🍛',
    'hakka-noodles': '🍜',
    
    // Rolls
    'kolkata-roll': '🌯',
    'spring-roll': '🌯',
    'special-roll': '🌯',
    
    // Pasta
    'pasta-alfredo': '🍝',
    'pasta-arrabiata': '🍝',
    
    // Pizza
    'pizza-margherita': '🍕',
    'pizza-queen': '👑',
    'pizza-farmhouse': '🌾',
    'pizza-paneer': '🧀',
    'pizza-pepperoni': '🌶️',
    'pizza-corn': '🌽',
    
    // Burgers
    'burger-veg': '🍔',
    'burger-paneer': '🍔',
    'burger-double': '🍔',
    
    // Sandwiches
    'sandwich-grilled': '🥪',
    'sandwich-paneer': '🥪',
    'sandwich-veg': '🥪',
    'sandwich-bombay': '🥪',
    'sandwich-special': '🥪',
    
    // Momos
    'momos-veg': '🥟',
    'momos-paneer': '🥟',
    
    // Beverages
    'coffee-hot': '☕',
    'coffee-cold': '🧊',
    'chai': '🫖',
    
    // Desserts
    'brownie': '🍰',
    'sizzling-brownie': '🍰',
    'shahi-tukda': '👑',
    'dessert-noodles': '🍜',
    'gulab-jamun': '🍡',
  }

  const emoji = emojiMap[type] || '🍽️'
  
  return (
    <span className={`inline-block ${className}`} role="img" aria-label={type}>
      {emoji}
    </span>
  )
}
