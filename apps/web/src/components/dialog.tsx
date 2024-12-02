import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Button from './button';
export default function Dialog({
  open,
  title,
  onSubmit,
  onCancel,
  description = '',
  isShowButtonTrigger = true,
  buttonTriggerText = 'Action',
}: {
  title: string;
  onSubmit: () => void;
  onCancel?: () => void;
  open?: boolean;
  description?: string;
  isShowButtonTrigger?: boolean;
  buttonTriggerText?: string;
}) {
  return (
    <AlertDialog.Root open={open}>
      {isShowButtonTrigger && (
        <AlertDialog.Trigger asChild>
          <button className="ml-4 font-medium text-red-600 hover:underline">
            {buttonTriggerText}
          </button>
        </AlertDialog.Trigger>
      )}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <AlertDialog.Title className="text-lg font-semibold">
            {title || 'Are you sure?'}
          </AlertDialog.Title>
          {description && (
            <AlertDialog.Description className="text-sm">
              {description}
            </AlertDialog.Description>
          )}
          <div className="flex justify-end gap-x-4">
            <AlertDialog.Cancel asChild>
              <Button
                type="button"
                className="text-black bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:ring-gray-400"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                type="button"
                onClick={onSubmit}
                className="text-white bg-red-700 hover:bg-red-800 focus:bg-red-800 focus:ring-red-900"
              >
                Submit
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
