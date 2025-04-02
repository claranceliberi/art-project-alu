import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn(className)} {...props}>
      <div className="container px-4 mx-auto">
        {children}
      </div>
    </section>
  )
} 