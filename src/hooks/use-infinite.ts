import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  loadMore,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading && hasMore) {
        loadMore();
      }
    },
    [isLoading, hasMore, loadMore]
  );

  useEffect(() => {
    const currentElement = lastElementRef.current;

    if (!currentElement) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "100px",
      threshold: 0.1,
    });

    observerRef.current.observe(currentElement);

    return () => {
      observerRef.current?.unobserve(currentElement);
    };
  }, [handleObserver]);

  return { lastElementRef };
};
