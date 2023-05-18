import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import ConditionsDropdown from '../../../src/components/dropdowns/ConditionsDropdown';
import userEvent from "@testing-library/user-event";

describe("ConditionsDropdown tests", () => {
  // make sure the component renders
  test("render test", () => {
    // render(<ConditionsDropdown onConditionSelect={(_) => {}}></ConditionsDropdown>);

    // // not testing every option because things are subject to change
    // expect(screen.getByText("Blinded")).toBeDefined();
    // expect(screen.getByText("Broken")).toBeDefined();
  });
});
