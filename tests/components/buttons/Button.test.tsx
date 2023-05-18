import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import Button from '../../../src/components/buttons/Button';
import userEvent from "@testing-library/user-event";

describe("Button tests", () => {
  // make sure the component renders
  test("render test", () => {
    render(<Button>hello</Button>);

    const b = screen.getByText("hello");

    expect(b).toBeDefined();
  });

  // Buttons can be passed variants
  test("variants", () => {
    render(<div>
      <Button variant="primary">a</Button>
      <Button variant="subtle">b</Button>
      <Button variant="destructive">c</Button>
      <Button variant="text">d</Button>
      <Button variant="toggle">e</Button>
      <Button variant="toggleActive">f</Button>
    </div>);

      expect(screen.getByText("a")).toBeDefined();
      expect(screen.getByText("b")).toBeDefined();
      expect(screen.getByText("c")).toBeDefined();
      expect(screen.getByText("d")).toBeDefined();
      expect(screen.getByText("e")).toBeDefined();
      expect(screen.getByText("f")).toBeDefined();
  });

  // make sure the user can click it without crashing
  test("click test", () => {
    render(<Button>hello</Button>);

    const b = screen.getByText("hello");

    userEvent.click(b);

    expect(b).toBeDefined();
  });
});
