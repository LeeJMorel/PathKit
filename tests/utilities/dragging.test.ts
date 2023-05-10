import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import {reorder, onDragEnd} from '../../src/utilities/dragging'

describe("Dragging tests", () => {
  // Test reorder()
  test("reorder()", () => {
    // expect(reorder([1, 2, 3], 0, 1)).toBe([2, 1, 3]);
  });

  // Test onDragEnd()
  test("onDragEnd()", () => {

  });
});
