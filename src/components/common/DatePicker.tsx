import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'
import { Calendar } from 'lucide-react'

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  containerClassName?: string
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-neutral-500">
            {label}
          </label>
        )}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            ref={ref}
            type="date"
            className={cn(
              'h-9 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3 text-sm',
              'text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
              'transition-colors',
              className,
            )}
            {...props}
          />
        </div>
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
