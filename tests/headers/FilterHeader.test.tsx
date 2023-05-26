import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import { FilterHeader } from '../../src/components/headers/FilterHeader';
import {PassiveAction} from "../../src/assets/iconKey"

describe("FilterHeader tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <FilterHeader title="testing123" keywords={[{ icon: <PassiveAction />, keyword: "Passive Action" },]}>
            </FilterHeader>
        );

        const b = screen.getByText(/testing123/);

        expect(b).toBeDefined();
    });

    // testing for a single child
    test("child test", () => {
        render(
            <FilterHeader title="parent here" keywords={[{ icon: <PassiveAction />, keyword: "Passive Action" },]}>
                <h1>child component</h1>
            </FilterHeader>
        );

        expect(screen.getByText(/parent here/)).toBeDefined();
        expect(screen.queryAllByText("Passive Action")).toHaveLength(3);
    });

    test("icon starts shown", () => {
        render(
            <FilterHeader title="parent here" keywords={[{ icon: <PassiveAction />, keyword: "Passive Action" },]} toggle>
            </FilterHeader>
        );

        expect(screen.getByText(/parent here/)).toBeDefined();
        expect(screen.getAllByText(/Passive Action/)).toBeDefined();
    });

    test("toggles visibility", () => {
        render(
            <FilterHeader title="parent here" keywords={[]} toggle>
                <h1>child here</h1>
            </FilterHeader>
        );

        const b = screen.getByText(/parent here/);

        userEvent.click(b);

        expect(screen.getByText(/parent here/)).toBeDefined();
        expect(screen.queryAllByText(/child here/)).toBeDefined();
    });
});