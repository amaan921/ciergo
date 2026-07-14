import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Button } from '@/components/common/buttons/Button'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

export function BookingCalendarPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 p-6">
      <Breadcrumb
        items={[
          { label: 'Finance', href: ROUTES.financeBookings },
          { label: 'Bookings', href: ROUTES.financeBookings },
          { label: 'Calendar' },
        ]}
      />

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(ROUTES.financeBookings)}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900">
          Booking Calendar
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-16 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-6">
          <CalendarDays className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">
          Calendar View
        </h2>
        <p className="text-sm text-neutral-500 text-center max-w-md">
          The booking calendar view displays all bookings in a monthly, weekly,
          or daily calendar format. This feature is coming soon.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => navigate(ROUTES.financeBookings)}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Bookings
        </Button>
      </div>
    </div>
  )
}
