export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ??
  'http://localhost:3001';

async function postJson<T>(endpoint: string, payload: unknown): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const rawMessage = errorBody?.message;
      const message = Array.isArray(rawMessage)
        ? rawMessage[0]
        : rawMessage ?? 'Request failed';
      throw new Error(message);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network request failed');
  }
}

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return postJson<AuthResponse>('/auth/register', payload);
}

export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return postJson<AuthResponse>('/auth/login', payload);
}
