import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import DiceModule from '../../../src/components/modules/DiceModule';

describe("DiceModule tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <DiceModule/>
        );

        // this means it's rendering properly
        expect(screen.queryAllByText("Dice module not available")).toHaveLength(0);
    });
});