import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'
import { Search } from 'lucide-react'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  containerClassName?: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          ref={ref}
          type="text"
          className={cn(
            'h-9 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3 text-sm',
            'placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            'transition-colors',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
