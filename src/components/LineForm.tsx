import { AlertCircle } from 'lucide-react';
import InteractiveButton from './InteractiveButton.client';

const LineForm = () => {
  return (
    <>
      <form id='lineForm' className="space-y-6">
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
          <InteractiveButton formId='lineForm' />
        </div>
      </form>
    </>
  )
}

export default LineForm;