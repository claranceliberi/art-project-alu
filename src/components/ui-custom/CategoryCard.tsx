import { Link } from 'react-router-dom'
import { Category } from '@/services/category.service'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  // Create a URL-friendly slug from the category name
  const slug = category.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link 
      to={`/categories/${slug}`}
      className={cn(
        "block p-6 border border-border rounded-lg hover:bg-accent transition-colors text-center hover-lift",
        className
      )}
    >
      <h3 className="font-medium">{category.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">Explore collection</p>
    </Link>
  )
}
