export interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body?.error === "string") return body.error;
  } catch {
    // fall through to generic message
  }
  return "Something went wrong. Please try again.";
}

export async function fetchComments(limit?: number): Promise<Comment[]> {
  const query = limit ? `?limit=${limit}` : "";
  const response = await fetch(`/api/comments${query}`);
  if (!response.ok) throw new Error(await parseError(response));
  const data = await response.json();
  return data.comments as Comment[];
}

export async function postComment(params: {
  name: string;
  message: string;
  company?: string;
}): Promise<Comment> {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = await response.json();
  return data.comment as Comment;
}

export async function submitContact(params: {
  name: string;
  email: string;
  message: string;
  company?: string;
}): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error(await parseError(response));
}
