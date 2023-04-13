import React from "react";
import SearchSheet from "./components/center/SearchSheet";
import EntitySheet from "./components/center/EntitySheet";
import NotesSheet from "./components/center/NotesSheet";
import "./App.css";
import { ObjectProps } from "./App";

export interface CenterProps {
  selectedHeaderItem?: string;
  searchInfo?: ObjectProps;
  entityInfo?: ObjectProps;
}

function Center({
  selectedHeaderItem = "",
  searchInfo,
  entityInfo,
}: CenterProps) {
  let content;

  // Render different sheets based on the selectedHeaderItem prop
  if (selectedHeaderItem === "search") {
    content = <SearchSheet searchInfo={searchInfo} />;
  } else if (selectedHeaderItem === "entity") {
    content = <EntitySheet entityInfo={entityInfo} />;
  } else {
    content = <NotesSheet />;
  }

  return <div className="Center">{content}</div>;
}

export default Center;
