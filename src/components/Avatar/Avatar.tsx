interface AvatarProps {
  name: string
  size?: number
  style?: 'avataaars' | 'bottts' | 'lorelei' | 'micah' | 'adventurer' | 'fun-emoji'
  className?: string
}

export default function Avatar({ name, size = 40, style = 'micah', className = '' }: AvatarProps) {
  const seed = encodeURIComponent(name)
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`
  
  return (
    <img 
      src={avatarUrl} 
      alt={`${name} avatar`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  )
}
