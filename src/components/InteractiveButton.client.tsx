// app/components/InteractiveButton.client.tsx
'use client';

import { useTransition } from 'react';
import { Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { handleBroadcast } from '../app/actions';

type InteractiveButtonProps = {
  formId: string;
};

export default function InteractiveButton({ formId }: InteractiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    // フォーム要素をIDで取得
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const formData = new FormData(form);

    startTransition(() => {
      handleBroadcast(formData)
        .then((result) => {
          if (result?.success) {
            // 送信成功時はフォームのリセットとトーストの表示
            form.reset();
            toast.success('メッセージが正常に送信されました');
          }
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            toast.error(err.message || '送信に失敗しました');
          } else {
            toast.error('不明なエラーが発生。送信に失敗しました');
          }
        });
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={`px-6 py-2 rounded-md text-white font-medium flex items-center ${
          isPending ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            送信中...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            送信
          </>
        )}
      </button>
    </>
  );
}
