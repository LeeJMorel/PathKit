import React from "react";
import { DropResult } from "react-beautiful-dnd";

export const reorder = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const onDragEnd = <T extends unknown>(
  result: DropResult,
  items: T[],
  setItems: (items: T[]) => void
) => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const newItems = reorder(
    items,
    result.source.index,
    result.destination.index
  );

  setItems(newItems);
};
