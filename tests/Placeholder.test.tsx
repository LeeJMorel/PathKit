import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";

describe("Placeholder tests", () => {
  // this is a placeholder test to make sure the framework works properly
  test("placeholder test", () => {
    render(<h1>Testing 12345</h1>);

    expect(screen.getByText(/Testing/i)).toBeDefined();
    expect(screen.getByText(/12345/i)).toBeDefined();
    expect(screen.queryByText(/hello/i)).toBeNull();
  });
});
