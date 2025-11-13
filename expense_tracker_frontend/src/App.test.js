import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders dashboard by default", () => {
  render(<App />);
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});

test("theme toggle button exists and toggles label", () => {
  render(<App />);
  // button text will be either "🌙 Dark" or "☀️ Light" depending on default
  const button = screen.getByRole("button", { name: /Switch to/i });
  expect(button).toBeInTheDocument();
  const initialLabel = button.textContent;
  fireEvent.click(button);
  // after toggle label should change
  expect(button.textContent).not.toBe(initialLabel);
});
