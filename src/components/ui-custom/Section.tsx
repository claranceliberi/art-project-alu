
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  contentClassName?: string
}

export function Section({ 
  children, 
  title, 
  subtitle,
  className,
  contentClassName
}: SectionProps) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container px-6 mx-auto">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && <h2 className="text-2xl md:text-3xl font-medium mb-3">{title}</h2>}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}
