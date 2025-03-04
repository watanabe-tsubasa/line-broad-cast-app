'use client';

import React, { useTransition } from 'react';
import { handleBroadcast } from './app/actions';
import { Send, MessageSquare, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LineHeader from './components/LineHeader';
import './index.css';

function App() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      handleBroadcast(formData)
        .then((result) => {
          if (result?.success) {
            // フォームの内容をリセットしたい場合
            e.currentTarget.reset();
            toast.success('メッセージが正常に送信されました');
          }
        })
        .catch((err: unknown) => {
          if(err instanceof Error) {
            toast.error(err.message || '送信に失敗しました');
          } else {
            toast.error('不明なエラーが発生。送信に失敗しました');
          }
        });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <LineHeader />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="mr-2 text-green-500" />
            LINE Broadcast Message
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="channelAccessToken"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Channel Access Token
              </label>
              <input
                id="channelAccessToken"
                name="channelAccessToken"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="LINE Channel Access Tokenを入力"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="送信するメッセージを入力"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>全ユーザーにメッセージが送信されます</span>
              </div>

              <button
                type="submit"
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
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">使用方法</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>
              LINE Developersコンソールから取得したChannel Access
              Tokenを入力してください。
            </li>
            <li>送信したいメッセージを入力してください。</li>
            <li>
              「送信」ボタンをクリックすると、LINE公式アカウントの全友達にメッセージが送信されます。
            </li>
          </ol>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>注意:</strong> Broadcast
              APIは全ユーザーにメッセージを送信します。テスト環境で使用するか、慎重に使用してください。
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} LINE Bot Broadcast App</p>
          <p className="mt-1">
            このアプリケーションはLINE Messaging APIを使用しています
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
