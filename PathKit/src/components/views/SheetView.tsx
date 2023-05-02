import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./View.module.scss";

function SheetView() {
  return (
    <div className={styles.sheetView}>
      <Outlet />
    </div>
  );
}

export default SheetView;
