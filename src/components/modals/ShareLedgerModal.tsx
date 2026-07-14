import { useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/buttons/Button'
import { DatePicker } from '@/components/common/DatePicker'
import type { ShareLedgerSettings } from '@/types'
import { MessageCircle, Mail, Link, Info } from 'lucide-react'

interface ShareLedgerModalProps {
  isOpen: boolean
  onClose: () => void
  onShare: (method: 'whatsapp' | 'email' | 'link', settings: ShareLedgerSettings) => void
}

export function ShareLedgerModal({
  isOpen,
  onClose,
  onShare,
}: ShareLedgerModalProps) {
  const [settings, setSettings] = useState<ShareLedgerSettings>({
    sharePendingInvoicesOnly: false,
    customDateRange: false,
  })

  const handleShare = (method: 'whatsapp' | 'email' | 'link') => {
    onShare(method, settings)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ledger Settings"
      size="sm"
    >
      <div className="flex flex-col gap-5 p-6">
        {/* Share Pending Invoices Only */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.sharePendingInvoicesOnly}
            onChange={(e) =>
              setSettings({ ...settings, sharePendingInvoicesOnly: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <div>
            <span className="text-sm font-medium text-neutral-700">
              Share Pending Invoices Only
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              Only include unpaid/pending invoices in the shared ledger
            </p>
          </div>
        </label>

        {/* Custom Date Range */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.customDateRange}
            onChange={(e) =>
              setSettings({ ...settings, customDateRange: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-neutral-700">
              Custom Date Range
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              Filter ledger entries by a specific date range
            </p>
          </div>
        </label>

        {/* Date Range Pickers */}
        {settings.customDateRange && (
          <div className="flex items-end gap-3 ml-7">
            <DatePicker
              label="From"
              value={settings.dateFrom ?? ''}
              onChange={(e) =>
                setSettings({ ...settings, dateFrom: e.target.value || undefined })
              }
              containerClassName="flex-1"
            />
            <DatePicker
              label="To"
              value={settings.dateTo ?? ''}
              onChange={(e) =>
                setSettings({ ...settings, dateTo: e.target.value || undefined })
              }
              containerClassName="flex-1"
            />
          </div>
        )}

        {/* Info message when custom range disabled */}
        {!settings.customDateRange && (
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 border border-primary-100 px-3 py-2.5">
            <Info className="h-4 w-4 text-primary-500 shrink-0" />
            <p className="text-xs text-primary-700">
              This link contains full ledger data.
            </p>
          </div>
        )}

        {/* Share buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="success"
            onClick={() => handleShare('whatsapp')}
            leftIcon={<MessageCircle className="h-4 w-4" />}
            className="justify-center"
          >
            Share on WhatsApp
          </Button>
          <Button
            variant="primary"
            onClick={() => handleShare('email')}
            leftIcon={<Mail className="h-4 w-4" />}
            className="justify-center"
          >
            Share on Email
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('link')}
            leftIcon={<Link className="h-4 w-4" />}
            className="justify-center"
          >
            Copy Ledger Link
          </Button>
        </div>
      </div>
    </Modal>
  )
}
