import { MessageSquare } from 'lucide-react';
import LineHeader from './components/LineHeader';
import './index.css';
import LineForm from './components/LineForm';

function App() {

  return (
    <div className="min-h-screen bg-gray-50">

      <LineHeader />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="mr-2 text-green-500" />
            LINE Broadcast Message
          </h1>
          <LineForm />

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
