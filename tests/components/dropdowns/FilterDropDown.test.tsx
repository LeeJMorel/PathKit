import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import FilterDropdown from "../../../src/components/dropdowns/FilterDropdown";
import userEvent from "@testing-library/user-event";

describe("FilterDropdown tests", () => {
  // making sure the component renders
  test("render test", () => {
    render(<FilterDropdown keywords={["a", "b", "c"]} activeKeywords={[]} onKeywordToggle={(_) => { }}></FilterDropdown>);

    expect(screen.getByText("a")).toBeDefined();
    expect(screen.getByText("b")).toBeDefined();
    expect(screen.getByText("c")).toBeDefined();
    expect(screen.queryAllByText("d").length).toBe(0);
  });

  // making sure it updates properly
  test("update test", () => {
    let works = false;
    render(<FilterDropdown keywords={["a", "b", "c"]} activeKeywords={[]} onKeywordToggle={(option) => { console.log("OPTION: " + option); works = true; }}></FilterDropdown>);

    const elmt_a = screen.getByLabelText("a");

    userEvent.click(elmt_a);

    expect(works).toBeTruthy();
    expect(screen.getByText("a")).toBeDefined();
    expect(screen.getByText("b")).toBeDefined();
    expect(screen.getByText("c")).toBeDefined();
    expect(screen.queryAllByText("d").length).toBe(0);
  });
});
