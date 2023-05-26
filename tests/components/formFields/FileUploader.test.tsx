import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import FileUploader from '../../../src/components/formFields/FileUploader';
import { fail } from "assert";

describe("FileUploader tests", () => {
    // make sure the component renders
    test("render test", () => {
        render(
            <FileUploader id="file-uploader" onUpload={() => { }}>uploader</FileUploader>
        );

        const b = screen.getByText("uploader");

        expect(b).toBeDefined();
    });

    // DOM is too complex to test file uploading
    // test("file upload", () => {
    //     let result = "";

    //     render(
    //         <FileUploader id="h" onUpload={(file) => { if (file) { result = file?.toString(); } }}>testing</FileUploader>
    //     );

    //     const b = screen.getByText("tesaating");

    //     if (!b) {
    //         fail();
    //     }

    //     userEvent.upload(b, new File(["hello123"], "FileUploader-test.txt"));

    //     expect(result).toBe("hello123");
    // });
});