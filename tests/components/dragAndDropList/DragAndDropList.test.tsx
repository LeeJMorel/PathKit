import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import DragAndDropList from "../../../src/components/dragAndDropList/DragAndDropList";
import userEvent from "@testing-library/user-event";

describe("DragAndDropList tests", () => {
  // make sure the component renders
  test("render test", () => {
    render(<DragAndDropList id={"test"} items={[{id: 0, value: "a"}, {id: 1, value: "b"}, {id: 2, value: "c"}]} itemIdKey={"id"} setItems={() => {}} onRenderItem={(i: any) => <h1>{i.value}</h1>}></DragAndDropList>);

    expect(screen.getByText("a")).toBeDefined();
    expect(screen.getByText("b")).toBeDefined();
    expect(screen.getByText("c")).toBeDefined();
    expect(screen.queryAllByText("d").length).toBe(0);
    
  });
  
  // test dragging capabilities
  // order will be tested in another place
  test("reorder test", () => {
    render(<DragAndDropList id={"test"} items={[{id: 0, value: "a"}, {id: 1, value: "b"}, {id: 2, value: "c"}]} itemIdKey={"id"} setItems={() => {}} onRenderItem={(i: any) => <h1>{i.value}</h1>}></DragAndDropList>);

    let a = screen.getByText("a");
    let c = screen.getByText("c");

    userEvent.pointer([
        // click at "a"
        {keys: '[MouseLeft>]', target: a},
        // move the mouse to "c"
        {pointerName: 'mouse', target: c},
        // release the mouse button
        {keys: '[/MouseLeft]'}
    ]);
    
    // everything should still exist

    expect(screen.queryAllByText("a").length).toBe(1);
    expect(screen.queryAllByText("b").length).toBe(1);
    expect(screen.queryAllByText("c").length).toBe(1);
    expect(screen.queryAllByText("d").length).toBe(0);
  });
});
