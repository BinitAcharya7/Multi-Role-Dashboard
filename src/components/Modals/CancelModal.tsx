import { useState } from 'react';
import { Button } from '../ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

export default function CancelModal({ isOpen, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const canSubmit = confirmText === 'CONFIRM';

  const handleSubmit = () => {
    if (!canSubmit) return;
    onConfirm(reason);
    setReason('');
    setConfirmText('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 w-96 shadow-lg bg-linear-120 from-blue-950 via-purple-950 to-blue-950 border border-red-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-center">Cancel Request</h2>

        <p className="text-sm mb-3">
          Are you sure you want to cancel this request?
        </p>

        <textarea
          placeholder="Optional reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <input
          type="text"
          placeholder='Type "CONFIRM" to cancel'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            variant="destructive"
          >
            Confirm Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
