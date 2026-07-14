import type {
  Booking,
  BookingStatus,
  BookingType,
  Customer,
  LedgerEntry,
  LedgerEntryType,
  Owner,
  PaymentMode,
  PaymentStatus,
  Vendor,
} from '@/types'

// ── Helpers ───────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1).getTime()
  const end = new Date(endYear, 11, 31).getTime()
  return new Date(start + Math.random() * (end - start)).toISOString().split('T')[0]
}

function generateBookingId(type: BookingType, index: number): string {
  const prefixes: Record<BookingType, string> = {
    flight: 'OS',
    hotel: 'OK',
    package: 'U',
    transfer: 'OS',
    visa: 'U',
    insurance: 'OK',
  }
  const prefix = prefixes[type]
  const suffix = `ABC${(index + 10).toString()}`
  return `${prefix}-${suffix}`
}

// ── Owners ────────────────────────────────────────────────────────────

const FIRST_NAMES = [
  'Resham', 'Anand', 'Suniti', 'Gaurav', 'Shirish',
  'Priya', 'Rohit', 'Meera', 'Karan', 'Neha',
]

const LAST_NAMES = [
  'Deo', 'Mishra', 'Jha', 'Kapoor', 'Pandey',
  'Sharma', 'Verma', 'Singh', 'Khan', 'Patel',
]

export const owners: Owner[] = Array.from({ length: 10 }, (_, i) => ({
  id: `OWN-${(i + 1).toString().padStart(3, '0')}`,
  name: `${FIRST_NAMES[i]} ${LAST_NAMES[i]}`,
  email: `${FIRST_NAMES[i].toLowerCase()}.${LAST_NAMES[i].toLowerCase()}@ciergo.com`,
}))

// ── Customers ─────────────────────────────────────────────────────────

const CUSTOMER_FIRST = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun',
  'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Diya', 'Ananya', 'Aadhya', 'Saanvi', 'Myra',
  'Pari', 'Anika', 'Navya', 'Kiara', 'Riya',
  'Rohan', 'Kabir', 'Shaurya', 'Atharv', 'Advait',
  'Dhruv', 'Ritvik', 'Harsh', 'Pranav', 'Arnav',
  'Zara', 'Ira', 'Avni', 'Misha', 'Nisha',
  'Tanya', 'Simran', 'Pooja', 'Radhika', 'Sneha',
]

const CUSTOMER_LAST = [
  'Sharma', 'Verma', 'Singh', 'Kumar', 'Gupta',
  'Patel', 'Reddy', 'Joshi', 'Mehta', 'Shah',
  'Nair', 'Iyer', 'Rao', 'Das', 'Bose',
  'Chopra', 'Malhotra', 'Khanna', 'Bajaj', 'Agarwal',
  'Tiwari', 'Mishra', 'Pandey', 'Dubey', 'Trivedi',
  'Saxena', 'Srivastava', 'Yadav', 'Chauhan', 'Thakur',
  'Kulkarni', 'Deshmukh', 'Bhatt', 'Pillai', 'Menon',
  'Banerjee', 'Chatterjee', 'Mukherjee', 'Ghosh', 'Sen',
]

export const customers: Customer[] = Array.from({ length: 40 }, (_, i) => ({
  id: `CUST-${(i + 1).toString().padStart(3, '0')}`,
  name: `${CUSTOMER_FIRST[i]} ${CUSTOMER_LAST[i]}`,
  email: `${CUSTOMER_FIRST[i].toLowerCase()}@email.com`,
  phone: `+91 ${randomInt(70000, 99999)}${randomInt(10000, 99999)}`,
}))

// ── Vendors ───────────────────────────────────────────────────────────

const VENDOR_NAMES = [
  'SkyWay Airlines', 'Royal Hotels Group', 'Dubai Explorers',
  'Mountain Transfers', 'Visa Express', 'TravelGuard Insurance',
  'Gulf Airways', 'Marriott Partners', 'UAE Adventures',
  'City Cabs International', 'FastVisa Services', 'SecureTrip Insurance',
  'Jet Connect', 'Hilton Associates', 'Safari World',
  'Airport Shuttle Co', 'Global Visa Hub', 'TripShield Insurance',
  'Air India Partners', 'Taj Hotels Network', 'Bangkok Tours',
  'Metro Transport', 'EasyVisa Pro', 'TravelSafe Co',
  'SpiceJet Associates', 'ITC Hotels', 'Singapore Discoveries',
  'Premium Transfers', 'QuickVisa Solutions', 'AIG Travel',
]

export const vendors: Vendor[] = Array.from({ length: 30 }, (_, i) => ({
  id: `VND-${(i + 1).toString().padStart(3, '0')}`,
  name: VENDOR_NAMES[i],
  email: `contact@${VENDOR_NAMES[i].toLowerCase().replace(/\s+/g, '')}.com`,
  phone: `+91 ${randomInt(70000, 99999)}${randomInt(10000, 99999)}`,
}))

// ── Bookings ──────────────────────────────────────────────────────────

const SERVICE_NAMES: Record<BookingType, string[]> = {
  flight: ['Flight', 'Flight – Economy', 'Flight – Business'],
  hotel: ['Accommodation', 'Hotel Stay', 'Resort Booking'],
  package: ['Explore UAE', 'Bangkok Tour', 'Singapore Package', 'Bali Package'],
  transfer: ['Transportation', 'Airport Transfer', 'City Transfer'],
  visa: ['Visa Processing', 'Express Visa', 'Tourist Visa'],
  insurance: ['Travel Insurance', 'Medical Insurance'],
}

// Deterministic first 6 bookings matching Figma exactly
const figmaBookings: Booking[] = [
  {
    id: 'OS-ABC12',
    leadPax: 'Anand Mishra',
    customerId: 'CUST-001',
    vendorId: 'VND-001',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Flight',
    bookingType: 'flight',
    bookingStatus: 'confirmed',
    paymentStatus: 'paid',
    amount: 24580,
    ownerId: 'OWN-001',
    hasVoucher: true,
    taskCount: 1,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 0,
    pendingVendorPayment: 0,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
  {
    id: 'OS-ABC13',
    leadPax: 'Sumit Jha',
    customerId: 'CUST-002',
    vendorId: 'VND-002',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Accommodation',
    bookingType: 'hotel',
    bookingStatus: 'confirmed',
    paymentStatus: 'partial',
    amount: 24580,
    ownerId: 'OWN-002',
    hasVoucher: true,
    taskCount: 1,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 8000,
    pendingVendorPayment: 5000,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
  {
    id: 'U-ABC12',
    leadPax: 'Anand Mishra',
    customerId: 'CUST-001',
    vendorId: 'VND-003',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Explore UAE',
    bookingType: 'package',
    bookingStatus: 'pending',
    paymentStatus: 'unpaid',
    amount: 24580,
    ownerId: 'OWN-001',
    hasVoucher: true,
    taskCount: 1,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 24580,
    pendingVendorPayment: 15000,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
  {
    id: 'OS-ABC14',
    leadPax: 'Zaheer',
    customerId: 'CUST-003',
    vendorId: 'VND-004',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Transportation',
    bookingType: 'transfer',
    bookingStatus: 'pending',
    paymentStatus: 'unpaid',
    amount: 24580,
    ownerId: 'OWN-003',
    hasVoucher: true,
    taskCount: 0,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 24580,
    pendingVendorPayment: 12000,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
  {
    id: 'OS-ABC15',
    leadPax: 'Gaurav Kapoor',
    customerId: 'CUST-004',
    vendorId: 'VND-005',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Flight',
    bookingType: 'flight',
    bookingStatus: 'confirmed',
    paymentStatus: 'paid',
    amount: 24580,
    ownerId: 'OWN-004',
    hasVoucher: true,
    taskCount: 0,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 0,
    pendingVendorPayment: 0,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
  {
    id: 'OS-ABC16',
    leadPax: 'Shirish Pandey',
    customerId: 'CUST-005',
    vendorId: 'VND-006',
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: 'Flight',
    bookingType: 'flight',
    bookingStatus: 'pending',
    paymentStatus: 'unpaid',
    amount: 24580,
    ownerId: 'OWN-005',
    hasVoucher: true,
    taskCount: 0,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: 24580,
    pendingVendorPayment: 10000,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  },
]

// Generate remaining bookings to reach exactly 78 total in bookings tab
// 6 figma bookings (approved, not deleted) + 72 more approved = 78 in bookings tab
// Plus 5 deleted and 10 waiting for approval (separate from the 78)
const additionalBookings: Booking[] = []

// 72 approved bookings (non-deleted) - these make the Bookings tab show 78 total
for (let i = 0; i < 72; i++) {
  const idx = i + 6
  const bookingType = (['flight', 'hotel', 'package', 'transfer', 'visa', 'insurance'] as BookingType[])[idx % 6]
  const paymentStatuses: PaymentStatus[] = ['paid', 'partial', 'unpaid', 'paid', 'unpaid', 'paid']
  const amount = 24580

  additionalBookings.push({
    id: generateBookingId(bookingType, idx),
    leadPax: `${FIRST_NAMES[idx % FIRST_NAMES.length]} ${LAST_NAMES[idx % LAST_NAMES.length]}`,
    customerId: customers[idx % customers.length].id,
    vendorId: vendors[idx % vendors.length].id,
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: SERVICE_NAMES[bookingType][idx % SERVICE_NAMES[bookingType].length],
    bookingType,
    bookingStatus: (['confirmed', 'pending', 'completed', 'confirmed', 'pending'] as BookingStatus[])[idx % 5],
    paymentStatus: paymentStatuses[idx % paymentStatuses.length],
    amount,
    ownerId: owners[idx % owners.length].id,
    hasVoucher: idx % 3 !== 2,
    taskCount: idx % 4 === 0 ? 0 : (idx % 3) + 1,
    isDeleted: false,
    approvalStatus: 'approved',
    pendingCustomerPayment: idx % 3 === 0 ? 0 : randomInt(5000, 15000),
    pendingVendorPayment: idx % 3 === 1 ? 0 : randomInt(3000, 10000),
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  })
}

// 5 deleted bookings
for (let i = 0; i < 5; i++) {
  const idx = 78 + i
  const bookingType = (['flight', 'hotel', 'package', 'transfer', 'visa'] as BookingType[])[i]
  const amount = 24580

  additionalBookings.push({
    id: generateBookingId(bookingType, idx),
    leadPax: `${FIRST_NAMES[(idx + 3) % FIRST_NAMES.length]} ${LAST_NAMES[(idx + 2) % LAST_NAMES.length]}`,
    customerId: customers[idx % customers.length].id,
    vendorId: vendors[idx % vendors.length].id,
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: SERVICE_NAMES[bookingType][0],
    bookingType,
    bookingStatus: (['confirmed', 'pending', 'cancelled'] as BookingStatus[])[i % 3],
    paymentStatus: (['paid', 'partial', 'unpaid', 'paid', 'unpaid'] as PaymentStatus[])[i],
    amount,
    ownerId: owners[i % owners.length].id,
    hasVoucher: i % 2 === 0,
    taskCount: i % 3,
    isDeleted: true,
    approvalStatus: 'approved',
    pendingCustomerPayment: 0,
    pendingVendorPayment: 0,
    pendingCustomerRefund: i % 2 === 0 ? 5000 : 0,
    pendingVendorRefund: 0,
  })
}

// 6 waiting for approval bookings (pending)
for (let i = 0; i < 6; i++) {
  const idx = 83 + i
  const bookingType = (['flight', 'hotel', 'package', 'transfer', 'visa', 'insurance'] as BookingType[])[i]
  const amount = 24580

  additionalBookings.push({
    id: generateBookingId(bookingType, idx),
    leadPax: `${FIRST_NAMES[(idx + 5) % FIRST_NAMES.length]} ${LAST_NAMES[(idx + 1) % LAST_NAMES.length]}`,
    customerId: customers[idx % customers.length].id,
    vendorId: vendors[idx % vendors.length].id,
    bookingDate: '2026-03-05',
    travelDate: '2026-03-05',
    service: SERVICE_NAMES[bookingType][0],
    bookingType,
    bookingStatus: 'pending',
    paymentStatus: (['unpaid', 'partial', 'unpaid', 'paid', 'unpaid', 'partial'] as PaymentStatus[])[i],
    amount,
    ownerId: owners[i % owners.length].id,
    hasVoucher: i < 3,
    taskCount: i % 2 === 0 ? 1 : 0,
    isDeleted: false,
    approvalStatus: 'pending',
    pendingCustomerPayment: 15000,
    pendingVendorPayment: 10000,
    pendingCustomerRefund: 0,
    pendingVendorRefund: 0,
  })
}

export const bookings: Booking[] = [...figmaBookings, ...additionalBookings]

// ── Ledger Entries ────────────────────────────────────────────────────

const LEDGER_ENTRY_TYPES_CUSTOMER: LedgerEntryType[] = [
  'booking_created',
  'money_received',
  'credit_note',
  'money_paid',
  'invoice',
  'pay_in',
  'pay_out',
]

const LEDGER_ENTRY_TYPES_VENDOR: LedgerEntryType[] = [
  'booking_created',
  'money_received',
  'debit_note',
  'money_paid',
  'invoice',
  'pay_in',
  'pay_out',
]

const PAYMENT_MODES: PaymentMode[] = ['cash', 'bank_transfer', 'credit_card', 'upi', 'cheque', 'wallet']

const ACCOUNT_NAMES = [
  'HDFC Bank', 'ICICI Bank', 'SBI Account', 'Axis Bank',
  'Cash Counter', 'Paytm Wallet', 'Company Account',
]

function generateLedgerEntries(
  entityId: string,
  entityType: 'customer' | 'vendor',
): LedgerEntry[] {
  const count = randomInt(5, 15)
  const entryTypes = entityType === 'customer' ? LEDGER_ENTRY_TYPES_CUSTOMER : LEDGER_ENTRY_TYPES_VENDOR
  let closingBalance = 0
  const entries: LedgerEntry[] = []

  for (let i = 0; i < count; i++) {
    const entryType = pick(entryTypes)
    const amount = randomInt(5, 50) * 1000
    const isPositive = entityType === 'customer'
      ? ['money_received', 'credit_note', 'pay_in'].includes(entryType)
      : ['booking_created', 'money_received', 'pay_in'].includes(entryType)

    const signedAmount = isPositive ? amount : -amount
    closingBalance += signedAmount

    const relatedBooking = pick(bookings)

    entries.push({
      id: `LED-${entityId}-${(i + 1).toString().padStart(3, '0')}`,
      entityId,
      entityType,
      bookingId: relatedBooking.id,
      service: relatedBooking.service,
      date: randomDate(2025, 2025),
      entryType,
      status: pick(['pending', 'completed', 'completed', 'completed'] as const),
      mode: pick(PAYMENT_MODES),
      account: pick(ACCOUNT_NAMES),
      amount: signedAmount,
      closingBalance,
      isPendingInvoice: Math.random() > 0.7,
    })
  }

  return entries
}

export const customerLedgerEntries: Map<string, LedgerEntry[]> = new Map(
  customers.map((c) => [c.id, generateLedgerEntries(c.id, 'customer')])
)

export const vendorLedgerEntries: Map<string, LedgerEntry[]> = new Map(
  vendors.map((v) => [v.id, generateLedgerEntries(v.id, 'vendor')])
)

// ── Lookup helpers ────────────────────────────────────────────────────

export function getOwnerById(id: string): Owner | undefined {
  return owners.find((o) => o.id === id)
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id)
}
