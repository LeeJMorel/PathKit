import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import CollapsibleHeader from '../../src/components/headers/CollapsibleHeader';

describe("CollapsibleHeader tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <CollapsibleHeader title="testing123">
            </CollapsibleHeader>
        );

        const b = screen.getByText("testing123");

        expect(b).toBeDefined();
    });

    // testing for a single child
    test("child test", () => {
        render(
            <CollapsibleHeader title="parent here"/>
        );

        expect(screen.getByText("parent here")).toBeDefined();
    });

    test("multiple children", () => {
        render(
            <CollapsibleHeader title="parent here">
                <ul>
                    <li>child 1</li>
                    <li>child 2</li>
                    <li>child 3</li>
                </ul>
            </CollapsibleHeader>
        );

        expect(screen.getByText("parent here")).toBeDefined();
        expect(screen.getByText("child 1")).toBeDefined();
        expect(screen.getByText("child 2")).toBeDefined();
        expect(screen.getByText("child 3")).toBeDefined();
        expect(screen.queryAllByText("child 4")).toHaveLength(0);
    })

    test("child starts shown", () => {
        render(
            <CollapsibleHeader title="parent here">
                <h1>child here</h1>
            </CollapsibleHeader>
        );

        expect(screen.getByText("parent here")).toBeDefined();
        expect(screen.getByText("child here")).toBeDefined();
    });

    test("toggles visibility", () => {
        render(
            <CollapsibleHeader title="parent here" toggle={true} nested>
                <h1>child here</h1>
            </CollapsibleHeader>
        );

        const b = screen.getByText("parent here");

        userEvent.click(b);

        expect(screen.getByText("parent here")).toBeDefined();
        expect(screen.queryAllByText("child here")).toBeDefined();
    });
});