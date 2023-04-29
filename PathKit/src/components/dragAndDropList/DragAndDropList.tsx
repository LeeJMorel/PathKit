import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { onDragEnd } from "../../utilities";
import classNames from "classnames";
import styles from "./DragAndDropList.module.scss";

export interface DraggableItem extends Object {
  id: string;
}

export interface IDragAndDropListProps<T extends DraggableItem> {
  as?: React.ElementType;
  id: string;
  items: T[];
  setItems: (items: T[]) => void;
  onDragEnd?: (result: DropResult) => void;
  onRenderItem: (item: T) => React.ReactNode;
  listProps?: React.HTMLProps<HTMLUListElement>;
  listItemProps?: React.HTMLProps<HTMLLIElement>;
}

export const DragAndDropList = <T extends DraggableItem>({
  as = "ul",
  id,
  items,
  setItems,
  onDragEnd: onDragEndProp,
  onRenderItem,
  listProps = {},
  listItemProps = {},
}: IDragAndDropListProps<T>) => {
  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result, items, setItems);
    if (typeof onDragEndProp === "function") {
      onDragEndProp(result);
    }
  };

  const El = as;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={id}>
        {(droppableProvided, droppableSnapshot) => (
          <El
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            {...listProps}
            className={classNames(styles.dragAndDropList, listProps.className)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <li
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={{
                      ...listItemProps.style,
                      ...draggableProvided.draggableProps.style,
                    }}
                    {...listItemProps}
                    className={classNames(
                      styles.dragAndDropListItem,
                      listItemProps.className,
                      draggableSnapshot.isDragging && styles.isDragging
                    )}
                  >
                    {onRenderItem(item)}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </El>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropList;
