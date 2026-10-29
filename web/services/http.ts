type ErrorBody = {
  message?: string;
};

export async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const data = (await response.json()) as TResponse & ErrorBody;
  if (!response.ok) {
    throw new Error(data.message || "No se pudo completar la operación");
  }
  return data;
}
