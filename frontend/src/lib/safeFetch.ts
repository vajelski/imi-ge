/**
 * Safely parse fetch response as JSON.
 * When server returns "Internal Server Error" (HTML) instead of JSON,
 * res.json() throws "Unexpected token 'I'...". This helper handles that.
 */
export async function parseJsonResponse<T = unknown>(
  res: Response,
  messages: { serverError?: string; unknownError?: string } = {}
): Promise<T> {
  const text = await res.text();
  if (!text || !text.trim()) {
    return {} as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    if (
      text.includes('Internal Server Error') ||
      text.startsWith('Internal S') ||
      text.includes('502 Bad Gateway') ||
      text.includes('Bad Gateway') ||
      text.includes('<html') ||
      text.includes('<!DOCTYPE')
    ) {
       throw new Error(messages.serverError ?? 'სერვერის შეცდომა. სცადეთ მოგვიანებით.');
    }
    throw new Error(messages.unknownError ?? (text.length > 100 ? text.slice(0, 100) + '...' : text || 'უცნობი შეცდომა'));
  }
}
