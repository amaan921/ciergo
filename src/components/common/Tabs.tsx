import type { ReactNode } from 'react'
import { cn } from '@/utils'

interface Tab {
  id: string
  label: string
  count?: number
  extra?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
  rightContent?: ReactNode
}

export function Tabs({ tabs, activeTab, onChange, className, rightContent }: TabsProps) {
  return (
    <div className={cn('flex items-center justify-between border-b border-neutral-200', className)}>
      <div className="flex items-center gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-amber-700'
                : 'text-neutral-500 hover:text-neutral-700',
            )}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs',
                    activeTab === tab.id
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-neutral-100 text-neutral-500',
                  )}
                >
                  {tab.count}
                </span>
              )}
              {tab.extra}
            </div>

            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {rightContent && <div className="flex items-center gap-3 pr-2">{rightContent}</div>}
    </div>
  )
}
