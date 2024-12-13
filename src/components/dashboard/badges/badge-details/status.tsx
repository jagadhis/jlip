import { Button } from '@/components/ui/button';

export default function BadgeStatus() {
  return (
    <div className="p-4 space-y-4">
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">Ready to Begin!</h3>
        <p className="text-green-700">
          Your adventure is about to start! Click "Add to Wallet" to begin.
        </p>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Have a special code? Enter it here:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your code"
            className="flex-1 p-2 border rounded-lg"
          />
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
}