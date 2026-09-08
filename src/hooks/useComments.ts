import { useEffect, useState } from "react";
import { fetchComments, type Comment } from "../lib/api";

interface UseCommentsResult {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  prepend: (comment: Comment) => void;
}

export function useComments(limit?: number): UseCommentsResult {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchComments(limit)
      .then((result) => {
        if (!cancelled) setComments(result);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  const prepend = (comment: Comment) => {
    setComments((current) => [comment, ...current]);
  };

  return { comments, loading, error, prepend };
}
