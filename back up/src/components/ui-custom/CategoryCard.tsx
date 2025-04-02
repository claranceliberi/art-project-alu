import { Link } from 'react-router-dom'
import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link 
      to={`/categories/${category.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg hover-lift",
        className
      )}
    >
      <div className="relative aspect-square">
        <img 
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <div>
            <h3 className="font-medium text-lg text-white">{category.name}</h3>
            <p className="text-sm text-white/80 mt-1">Explore collection</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
