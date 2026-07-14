import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/buttons/Button'
import type { ButtonVariant } from '@/components/common/buttons/Button'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  confirmVariant?: ButtonVariant
  loading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  confirmVariant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="px-6 py-5">
        <h3 className="text-base font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-600">{message}</p>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          size="sm"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
