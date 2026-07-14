import type {
  LedgerEntry,
  LedgerFilters,
  LedgerSummary,
  LedgerType,
  ShareLedgerSettings,
} from '@/types'
import {
  customerLedgerEntries,
  vendorLedgerEntries,
  getCustomerById,
  getVendorById,
} from '@/data/mockData'
import { isWithinInterval, parseISO } from 'date-fns'

function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function matchesDateRange(date: string, from?: string, to?: string): boolean {
  if (!from && !to) return true
  const d = parseISO(date)
  const start = from ? parseISO(from) : new Date(0)
  const end = to ? parseISO(to) : new Date(9999, 11, 31)
  return isWithinInterval(d, { start, end })
}

function applyLedgerFilters(entries: LedgerEntry[], filters: LedgerFilters): LedgerEntry[] {
  return entries.filter((e) => {
    if (!matchesDateRange(e.date, filters.bookingDateFrom, filters.bookingDateTo)) return false
    if (!matchesDateRange(e.date, filters.travelDateFrom, filters.travelDateTo)) return false
    if (filters.pendingInvoiceOnly && !e.isPendingInvoice) return false
    return true
  })
}

export interface GetLedgerResult {
  entries: LedgerEntry[]
  total: number
  entityName: string
  entityId: string
}

export async function getLedgerEntries(
  entityId: string,
  entityType: LedgerType,
  filters: LedgerFilters,
): Promise<GetLedgerResult> {
  await delay()
  const entriesMap = entityType === 'customer' ? customerLedgerEntries : vendorLedgerEntries
  const rawEntries = entriesMap.get(entityId) ?? []
  const entries = applyLedgerFilters(rawEntries, filters)

  const entity = entityType === 'customer'
    ? getCustomerById(entityId)
    : getVendorById(entityId)

  return {
    entries,
    total: entries.length,
    entityName: entity?.name ?? 'Unknown',
    entityId,
  }
}

export async function getLedgerSummary(
  entityId: string,
  entityType: LedgerType,
): Promise<LedgerSummary> {
  await delay(100)
  const entriesMap = entityType === 'customer' ? customerLedgerEntries : vendorLedgerEntries
  const entries = entriesMap.get(entityId) ?? []

  let invoice = 0
  let creditNote = 0
  let payIn = 0
  let payOut = 0

  for (const entry of entries) {
    switch (entry.entryType) {
      case 'invoice':
        invoice += Math.abs(entry.amount)
        break
      case 'credit_note':
        creditNote += Math.abs(entry.amount)
        break
      case 'pay_in':
        payIn += Math.abs(entry.amount)
        break
      case 'pay_out':
        payOut += Math.abs(entry.amount)
        break
    }
  }

  const balance = invoice - creditNote - payIn + payOut

  return {
    balance,
    label: balance > 0 ? 'You Collect' : 'You Pay',
    invoice,
    creditNote,
    payIn,
    payOut,
  }
}

export async function shareLedger(
  _entityId: string,
  _entityType: LedgerType,
  _settings: ShareLedgerSettings,
  method: 'whatsapp' | 'email' | 'link',
): Promise<string> {
  await delay(300)

  switch (method) {
    case 'whatsapp':
      return 'Ledger shared via WhatsApp successfully'
    case 'email':
      return 'Ledger shared via Email successfully'
    case 'link':
      return `https://ciergo.com/ledger/${_entityId}?token=${Math.random().toString(36).slice(2, 10)}`
    default:
      return 'Shared successfully'
  }
}

export function getTotalReceived(entityId: string, entityType: LedgerType): number {
  const entriesMap = entityType === 'customer' ? customerLedgerEntries : vendorLedgerEntries
  const entries = entriesMap.get(entityId) ?? []
  return entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0)
}

export function getTotalPaid(entityId: string, entityType: LedgerType): number {
  const entriesMap = entityType === 'customer' ? customerLedgerEntries : vendorLedgerEntries
  const entries = entriesMap.get(entityId) ?? []
  return entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0)
}
