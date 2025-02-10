import useDebounce from "@/hooks/use-debounce";
import { render, act, screen } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

jest.useFakeTimers();

function TestComponent() {
  const [value, setValue] = useState("");
  const debouncedCallback = useDebounce(() => setValue("debounced"), 500);

  return (
    <div>
      <button onClick={() => debouncedCallback()}>Click me</button>
      <span>{value}</span>
    </div>
  );
}

describe("useDebounce", () => {
  it("should call the callback after a delay", async () => {
    render(<TestComponent />);

    act(() => {
      screen.getByText("Click me").click();
      screen.getByText("Click me").click();
    });

    expect(screen.queryByText("debounced")).toBeNull();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(await screen.findByText("debounced")).toBeInTheDocument();
  });
});
