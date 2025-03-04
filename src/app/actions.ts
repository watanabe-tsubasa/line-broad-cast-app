'use server';
import { v4 as uuidv4 } from 'uuid';

export async function handleBroadcast(formData: FormData) {
  // FormDataから値を取得
  const message = formData.get('message')?.toString() || '';
  const channelAccessToken =
    formData.get('channelAccessToken')?.toString() || '';

  if (!message.trim() || !channelAccessToken.trim()) {
    throw new Error('メッセージまたはトークンが空です');
  }

  try {
    const response = await fetch(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${channelAccessToken}`,
          'X-Line-Retry-Key': uuidv4(),
        },
        body: JSON.stringify({ messages: [{ type: 'text', text: message }] }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // エラーの場合は data.message などからエラーメッセージを取得
      throw new Error(data?.message || '送信に失敗しました');
    }

    console.dir('Broadcast response:', data);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending broadcast:', error);
      throw new Error(error.message || '送信に失敗しました');
    } else {
      console.error('Error sending broadcast:', error);
      throw new Error('送信に失敗しました');
    }
  }
}
