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

export interface IDragAndDropListProps {
  listAs?: React.ElementType;
  listItemAs?: React.ElementType;
  id: string;
  items: any[];
  itemIdKey: string;
  setItems: (items: any[]) => void;
  onDragEnd?: (result: DropResult) => void;
  onRenderItem: (item: any) => React.ReactNode;
  listProps?: React.HTMLProps<HTMLUListElement>;
  listItemProps?: React.HTMLProps<HTMLLIElement>;
}

export const DragAndDropList = ({
  listAs = "ul",
  listItemAs = "li",
  id,
  items,
  setItems,
  itemIdKey = "id",
  onDragEnd: onDragEndProp,
  onRenderItem,
  listProps = {},
  listItemProps = {},
}: IDragAndDropListProps) => {
  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result, items, setItems);
    if (typeof onDragEndProp === "function") {
      onDragEndProp(result);
    }
  };

  const List = listAs;
  const ListItem = listItemAs;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={id.toString()}>
        {(droppableProvided, droppableSnapshot) => (
          <List
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            {...listProps}
            className={classNames(styles.dragAndDropList, listProps.className)}
          >
            {items.map((item, index) => (
              <Draggable
                key={item[itemIdKey]}
                draggableId={item[itemIdKey].toString()}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <ListItem
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
                  </ListItem>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropList;
