import React from "react";
import styles from "./Dropdown.module.scss";

interface IFilterDropdownProps {
  keywords: string[];
  activeKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
}

const FilterDropdown = ({
  keywords,
  activeKeywords,
  onKeywordToggle,
}: IFilterDropdownProps): JSX.Element => {
  const handleKeywordToggle = (keyword: string): void => {
    onKeywordToggle(keyword);
  };

  return (
    <div className={styles.menuDropdown}>
      <div className={styles.menuDropdownContent}>
        {keywords.map((keyword) => (
          <label key={keyword}>
            <input
              type="checkbox"
              checked={activeKeywords.includes(keyword)}
              onChange={() => handleKeywordToggle(keyword)}
            />
            {keyword}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
