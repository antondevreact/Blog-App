import { useInfiniteScroll } from "@/hooks/use-infinite";
import { render, act } from "@testing-library/react";

interface MockComponentProps {
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const MockComponent = ({
  isLoading,
  hasMore,
  loadMore,
}: MockComponentProps) => {
  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    loadMore,
  });

  return (
    <div>
      <div>Content</div>
      <div ref={lastElementRef} style={{ height: "100px", background: "red" }}>
        Last Element
      </div>
    </div>
  );
};

describe("useInfiniteScroll", () => {
  it("calls loadMore when last element becomes visible", () => {
    const spyLoadMore = jest.fn();

    const mockIntersectionObserver = jest
      .fn()
      .mockImplementation((callback) => {
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          trigger: () => {
            callback([
              {
                isIntersecting: true,
                target: document.createElement("div"),
              },
            ]);
          },
        };
      });

    global.IntersectionObserver = mockIntersectionObserver;

    render(
      <MockComponent isLoading={false} hasMore={true} loadMore={spyLoadMore} />
    );

    act(() => {
      mockIntersectionObserver.mock.results[0].value.trigger();
    });

    expect(spyLoadMore).toHaveBeenCalled();
  });

  it("does not call loadMore when isLoading is true", () => {
    const spyLoadMore = jest.fn();

    render(
      <MockComponent isLoading={true} hasMore={true} loadMore={spyLoadMore} />
    );

    act(() => {
      global.IntersectionObserver.mock.results[0].value.trigger();
    });

    expect(spyLoadMore).not.toHaveBeenCalled();
  });

  it("does not call loadMore when hasMore is false", () => {
    const spyLoadMore = jest.fn();

    render(
      <MockComponent isLoading={false} hasMore={false} loadMore={spyLoadMore} />
    );

    act(() => {
      global.IntersectionObserver.mock.results[0].value.trigger();
    });

    expect(spyLoadMore).not.toHaveBeenCalled();
  });
});
