// Tag display configuration
export interface TagConfig {
  label: string
  className: string
  icon?: string
}

export const tagConfigs: Record<string, TagConfig> = {
  spicy: {
    label: 'Spicy',
    className: 'bg-red-100 text-red-700',
    icon: '🌶️',
  },
  popular: {
    label: 'Popular',
    className: 'bg-red-500 text-white',
    icon: '🔥',
  },
  creamy: {
    label: 'Creamy',
    className: 'bg-yellow-100 text-yellow-700',
    icon: '🥛',
  },
  fresh: {
    label: 'Fresh',
    className: 'bg-green-100 text-green-700',
    icon: '🥬',
  },
  aromatic: {
    label: 'Aromatic',
    className: 'bg-purple-100 text-purple-700',
    icon: '🌿',
  },
  crispy: {
    label: 'Crispy',
    className: 'bg-orange-100 text-orange-700',
    icon: '✨',
  },
  buttery: {
    label: 'Buttery',
    className: 'bg-yellow-100 text-yellow-700',
    icon: '🧈',
  },
  cheesy: {
    label: 'Cheesy',
    className: 'bg-yellow-100 text-yellow-700',
    icon: '🧀',
  },
  fun: {
    label: 'Fun',
    className: 'bg-pink-100 text-pink-700',
    icon: '😊',
  },
  trio: {
    label: 'Trio',
    className: 'bg-blue-100 text-blue-700',
    icon: '🎯',
  },
  classic: {
    label: 'Classic',
    className: 'bg-blue-100 text-blue-700',
    icon: '⭐',
  },
  special: {
    label: 'Special',
    className: 'bg-gold/20 text-gold',
    icon: '✨',
  },
  loaded: {
    label: 'Loaded',
    className: 'bg-purple-100 text-purple-700',
    icon: '🔥',
  },
  smoky: {
    label: 'Smoky',
    className: 'bg-gray-100 text-gray-700',
    icon: '💨',
  },
  grilled: {
    label: 'Grilled',
    className: 'bg-orange-100 text-orange-700',
    icon: '🔥',
  },
  royal: {
    label: 'Royal',
    className: 'bg-purple-100 text-purple-700',
    icon: '👑',
  },
  rich: {
    label: 'Rich',
    className: 'bg-amber-100 text-amber-700',
    icon: '💎',
  },
  hot: {
    label: 'Hot',
    className: 'bg-red-100 text-red-700',
    icon: '🔥',
  },
  cold: {
    label: 'Cold',
    className: 'bg-blue-100 text-blue-700',
    icon: '❄️',
  },
  warm: {
    label: 'Warm',
    className: 'bg-orange-100 text-orange-700',
    icon: '🌡️',
  },
  sweet: {
    label: 'Sweet',
    className: 'bg-pink-100 text-pink-700',
    icon: '🍬',
  },
  double: {
    label: 'Double',
    className: 'bg-purple-100 text-purple-700',
    icon: '🍔',
  },
  tangy: {
    label: 'Tangy',
    className: 'bg-orange-100 text-orange-700',
    icon: '🍋',
  },
}

export function getTagConfig(tag: string): TagConfig {
  return tagConfigs[tag] || {
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
    className: 'bg-gray-100 text-gray-700',
  }
}
