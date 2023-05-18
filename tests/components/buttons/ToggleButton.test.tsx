import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import ToggleButton from '../../../src/components/buttons/ToggleButton';
import userEvent from "@testing-library/user-event";

describe("ToggleButton tests", () => {
  // make sure the component renders
  test("render test", () => {
    render(<ToggleButton options={["a", "b"]} value={"a"} onChange={() => {}}/>);


    expect(screen.getByText("a")).toBeDefined();
    expect(screen.getByText("b")).toBeDefined();
  });

  // make sure the user can click it without crashing
  test("click test", () => {
    render(<ToggleButton options={["a", "b"]} value={"a"} onChange={() => {}}/>);

    const a = screen.getByText("a");
    const b = screen.getByText("b");

    let a_style = a.style.backgroundColor;
    let b_style = b.style.backgroundColor;

    userEvent.click(screen.getByText("a"));
    
    expect(screen.getByText("a").style.backgroundColor).toBe(b_style);
    expect(screen.getByText("b").style.backgroundColor).toBe(a_style);

    userEvent.click(screen.getByText("b"));

    // colors switch when the click changes

    expect(screen.getByText("a").style.backgroundColor).toBe(b_style);
    expect(screen.getByText("b").style.backgroundColor).toBe(a_style);
  });
});
