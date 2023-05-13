import React, { useState } from "react";
import styles from "./Tab.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface Tab {
  id: string;
  title: string;
  content: JSX.Element;
}

interface TabsProps extends React.HTMLProps<HTMLDivElement> {
  tabs: Tab[];
  onClose?: () => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onClose, className, ...rest }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={classNames(styles.tabContainer, className)} {...rest}>
      <div className={styles.tabRow}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
        <div className={styles.tabRowFillBorder}></div>
        {onClose && (
          <div className={styles.close} title={"Close"} onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
      </div>
      <div className={styles.tabContent}>
        {tabs.map(
          (tab) => activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
