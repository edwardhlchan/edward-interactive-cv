import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";

it("renders the interactive CV application landmark", () => {
  render(<App />);
  expect(screen.getByRole("main", { name: /interactive cv/i })).toBeInTheDocument();
});
