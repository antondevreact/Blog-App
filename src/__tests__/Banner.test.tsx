import { Banner } from "@/components/Banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/components/Container", () => ({
  Container: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <div className={className}>{children}</div>,
}));

describe("Banner", () => {
  test("renders the banner with correct text", () => {
    render(<Banner />);

    const headingElement = screen.getByText(/THE BLOG/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("applies correct class names", () => {
    render(<Banner />);

    const headingElement = screen.getByText(/THE BLOG/i);
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("text-center");
  });

  test("renders Container with correct classes", () => {
    render(<Banner />);

    const containerElement = screen.getByText(/THE BLOG/i).parentElement;
    expect(containerElement).toHaveClass("flex");
    expect(containerElement).toHaveClass("flex-col");
  });
});
