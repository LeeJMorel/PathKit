import React from "react";
import SearchSheet from "./components/sheets/SearchSheet";
import EntitySheet from "./components/sheets/EntitySheet";
import NotesSheet from "./components/sheets/NotesSheet";
import styles from "./App.module.scss";
import { ObjectProps } from "./App";

export interface SheetViewProps {
  selectedHeaderItem?: string;
  searchInfo?: ObjectProps;
  entityInfo?: ObjectProps;
}

function SheetView({
  selectedHeaderItem = "",
  searchInfo,
  entityInfo,
}: SheetViewProps) {
  let content;

  // Render different sheets based on the selectedHeaderItem prop
  if (selectedHeaderItem === "search") {
    content = <SearchSheet searchInfo={searchInfo} />;
  } else if (selectedHeaderItem === "entity") {
    content = <EntitySheet entityInfo={entityInfo} />;
  } else {
    content = <NotesSheet />;
  }

  return <div className={styles.sheetView}>{content}</div>;
}

export default SheetView;
