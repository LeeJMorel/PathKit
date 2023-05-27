import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React, { useState } from "react";
import { expect } from "vitest";
import FormButton from '../../../src/components/formFields/FormButton';
import { fail } from "assert";

describe("FormButton tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <FormButton>test123</FormButton>
        );

        const b = screen.getByText("test123");

        expect(b).toBeDefined();
    });

    // make sure we can pass props to it
    test("props", () => {
        let result = false;
        render(
            <FormButton color="red" onClick={() => {result = true;}}>test123</FormButton>
        );

        const b = screen.getByText("test123");

        expect(b).toBeDefined();
        
    });
});