# Ciergo Finance – Bookings Module

A production-quality **Finance → Bookings** dashboard module built as a pixel-perfect implementation of the provided [Figma design](https://www.figma.com/design/92eCdLI1DUyMt0EEsHPCa8/Finance---Bookings). This enterprise SaaS module demonstrates clean React architecture, reusable component design, and comprehensive booking management workflows.

---

## ✨ Features

### Core Functionality
- **Bookings Table** — Sortable, paginated data table with 10 columns (Booking ID, Lead Pax, Travel Date, Service, Payment Status, Amount, Owner, Voucher, Tasks, Actions)
- **Three Booking Views** — Bookings (active), Deleted, and Waiting for Approval tabs
- **CRUD Operations** — Create, duplicate, soft-delete, restore, and edit bookings
- **Approval Workflow** — Approve/reject bookings with confirmation dialogs and status filtering (All/Approved/Pending/Rejected)
- **Customer & Vendor Ledgers** — Full ledger modals with transaction history, running balances, and summary bars
- **PDF Preview** — Slide-out drawer for previewing and downloading ledger statements
- **Share Ledger** — Share via WhatsApp, Email, or copy link with customizable date ranges
- **Filtering & Search** — Date range pickers, owner selection, booking type dropdown, and free-text search
- **Incomplete Bookings Toggle** — Quick filter for bookings with missing information
- **Toast Notifications** — Success/error/info feedback for all user actions

### UI/UX
- Pixel-perfect Figma match (~98–99% accuracy)
- Responsive layout with sidebar navigation
- Command bar with keyboard shortcut (⌘K)
- Stacked owner avatars with color-coded initials
- Payment status chips (Paid / Partially Paid / Pending)
- Smooth hover states, transitions, and micro-interactions

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript 6 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **Data Table** | TanStack Table v8 |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand (where needed) |
| **Icons** | Lucide React |
| **Dates** | date-fns v4 |
| **Utilities** | clsx + tailwind-merge |

> **Note:** Material UI and Ant Design are intentionally not used as per the assignment requirements.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/            # Reusable primitives
│   │   ├── badges/        # StatusChip
│   │   ├── buttons/       # Button
│   │   ├── ConfirmDialog  # Confirm action modal
│   │   ├── DatePicker     # Date input component
│   │   ├── Drawer         # Slide-out panel
│   │   ├── Dropdown       # Contextual menu
│   │   ├── Modal          # Dialog overlay
│   │   ├── SearchInput    # Search field
│   │   ├── Tabs           # Tab navigation
│   │   └── Toast          # Notification system
│   ├── filters/           # Filter bar & metrics
│   │   ├── BookingTabs    # Tab switcher + toggle + total badge
│   │   ├── FilterBar      # Date ranges, owner, type, search
│   │   └── MetricsRow     # Net / You Give / You Get pills
│   ├── layout/            # App shell
│   │   ├── AppLayout      # Sidebar + content wrapper
│   │   ├── Breadcrumb     # Navigation breadcrumb
│   │   ├── Sidebar        # Left navigation
│   │   └── TopBar         # Header with search
│   ├── ledger/            # Ledger features
│   │   ├── CustomerLedgerModal
│   │   ├── VendorLedgerModal
│   │   ├── LedgerTable    # Transaction history table
│   │   ├── LedgerSummaryBar
│   │   └── PdfPreviewDrawer
│   ├── modals/            # Feature modals
│   │   └── ShareLedgerModal
│   ├── pagination/        # Table pagination
│   │   └── Pagination
│   └── table/             # Bookings table
│       ├── BookingsTable  # Main data table
│       └── ActionMenu     # Row action icons + dropdown
├── constants/             # App-wide constants & label maps
├── data/                  # Mock data generators
├── hooks/                 # Custom React hooks
│   ├── useBookings        # Booking state & CRUD logic
│   └── useToast           # Toast notification hook
├── pages/
│   ├── FinanceBookings/   # Main bookings page
│   └── BookingCalendar/   # Calendar view (stub)
├── services/              # Mock API service layer
│   ├── bookingService     # Booking CRUD + filtering
│   └── ledgerService      # Ledger data + sharing
├── types/                 # TypeScript type definitions
└── utils/                 # Formatting & helper utilities
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ceargo-assingnment

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:5173/finance/bookings](http://localhost:5173/finance/bookings) in your browser.

### Build

```bash
# Type-check and build for production
npm run build

# Preview the production build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📸 Screenshots

The application matches the Figma design across all three booking views:

| View | Description |
|---|---|
| **Bookings** | Active bookings with full table, filters, and metrics |
| **Deleted** | Soft-deleted bookings with restore actions |
| **Waiting for Approval** | Pending bookings with approve/reject action buttons |

---

## 🧩 Key Design Decisions

### Mock Data Strategy
All data is simulated locally without a backend. The first 6 table rows are deterministic to exactly match the Figma design (OS-ABC12 through OS-ABC16), while the remaining 72+ bookings are generated programmatically. The service layer (`src/services/`) uses async functions with simulated delays to mirror real API behavior.

### Component Architecture
- **Separation of concerns** — Layout, filters, table, and modals are isolated into focused components
- **Reusable primitives** — Modal, Drawer, Dropdown, Button, and Toast are generic and can be composed anywhere
- **Custom hooks** — `useBookings` encapsulates all booking state, filtering, pagination, and CRUD operations
- **Type safety** — All data shapes, statuses, and action types are strictly typed

### Styling Approach
- Tailwind CSS v4 with `tailwind-merge` for conditional class composition
- Custom CSS properties for the design system (colors, spacing)
- No CSS-in-JS or component library dependencies

---

## 📋 Functional Coverage

| Feature | Status |
|---|---|
| Bookings data table with sorting | ✅ |
| Pagination (6/10/20/50 rows per page) | ✅ |
| Tab navigation (Bookings / Deleted / Waiting for Approval) | ✅ |
| Date range filters (Booking Date, Travel Date) | ✅ |
| Booking Owner filter | ✅ |
| Booking Type filter | ✅ |
| Search by ID / Lead Pax / Amount | ✅ |
| Incomplete bookings toggle | ✅ |
| Delete / Restore bookings | ✅ |
| Duplicate bookings | ✅ |
| Approve / Reject bookings | ✅ |
| Send for approval again | ✅ |
| Customer Ledger modal | ✅ |
| Vendor Ledger modal | ✅ |
| PDF preview drawer | ✅ |
| Share ledger (WhatsApp / Email / Link) | ✅ |
| Confirmation dialogs | ✅ |
| Toast notifications | ✅ |
| Summary metrics (Net / You Give / You Get) | ✅ |
| Responsive sidebar navigation | ✅ |

---

## 👤 Author

**Mohammad Amaan Khan**

Built as part of the Ciergo Round 1 Assignment.
