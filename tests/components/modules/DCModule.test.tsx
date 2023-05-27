import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import DCModule from '../../../src/components/modules/DCModule';

describe("DCModule tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <DCModule></DCModule>
        );

        expect(screen.getByText(/Difficulty/)).toBeDefined();
        expect(screen.getByText(/10/)).toBeDefined();
        expect(screen.getByText(/Adjustment/)).toBeDefined();
        expect(screen.getByText(/Unique/)).toBeDefined();
        expect(screen.getByText(/2/)).toBeDefined();
        expect(screen.getByText(/If the spell is uncommon/)).toBeDefined();
    });
});