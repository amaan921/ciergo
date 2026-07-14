import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { FinanceBookingsPage } from '@/pages/FinanceBookings/FinanceBookingsPage'
import { BookingCalendarPage } from '@/pages/BookingCalendar/BookingCalendarPage'
import { ROUTES } from '@/constants'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.financeBookings} element={<FinanceBookingsPage />} />
        <Route path={ROUTES.bookingCalendar} element={<BookingCalendarPage />} />
        <Route path="*" element={<Navigate to={ROUTES.financeBookings} replace />} />
      </Route>
    </Routes>
  )
}

export default App
