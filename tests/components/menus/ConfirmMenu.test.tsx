import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import ConfirmMenu from '../../../src/components/menus/ConfirmMenu';

describe("ConfirmMenu tests", () => {
    // make sure the component renders
    test("render test", () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore} title="test123"></ConfirmMenu>
        );

        expect(screen.getByText("test123")).toBeDefined();
    });

    test("confirm renders", () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore}></ConfirmMenu>
        );
        expect(screen.getByText("Yes I'm sure")).toBeDefined();
    });

    test("cancel renders", () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore}></ConfirmMenu>
        );
        expect(screen.getByText("Nevermind")).toBeDefined();
    });

    test("default title renders", () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore}></ConfirmMenu>
        );
        expect(screen.getByText("Are you sure?")).toBeDefined();
    });

    test("form closes submit", async () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore}></ConfirmMenu>
        );

        userEvent.click(screen.getByText("Yes I'm sure"));

        // delay until form closes

        await new Promise(r => setTimeout(r, 500));

        expect(screen.queryAllByText("Are you sure?")).toBeDefined();
    });

    test("form closes cancel", async () => {
        const ignore = () => {};
        render(
            <ConfirmMenu onClose={ignore} onCancel={ignore} onConfirm={ignore}></ConfirmMenu>
        );

        userEvent.click(screen.getByText("Nevermind"));

        // delay until form closes

        await new Promise(r => setTimeout(r, 500));

        expect(screen.queryAllByText("Are you sure?")).toBeDefined();
    });
});