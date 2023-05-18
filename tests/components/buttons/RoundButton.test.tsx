import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import RoundButton from '../../../src/components/buttons/RoundButton';

describe("RoundButton tests", () => {
  // make sure the component renders
  test("render test", () => {
    render(<RoundButton>hello</RoundButton>);

    const b = screen.getByText("hello");

    expect(b).toBeDefined();
  });

  // make sure the small variant renders
  test("small test", () => {
    render(<RoundButton small={true}>hello</RoundButton>);

    const b = screen.getByText("hello");

    expect(b).toBeDefined();
  });

  // RoundButtons can be passed variants
  test("variants", () => {
    render(<div>
      <RoundButton variant="primary">a</RoundButton>
      <RoundButton variant="subtle">b</RoundButton>
      <RoundButton variant="destructive">c</RoundButton>
      <RoundButton variant="text">d</RoundButton>
      <RoundButton variant="toggle">e</RoundButton>
      <RoundButton variant="toggleActive">f</RoundButton>
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
    render(<RoundButton >hello</RoundButton>);

    const b = screen.getByText("hello");

    userEvent.click(b);

    expect(b).toBeDefined();
  });
});