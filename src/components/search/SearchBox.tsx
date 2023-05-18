import { connectSearchBox } from "react-instantsearch-dom";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

// This part is our search bar display
export interface CustomSearchBoxProps
  extends React.HTMLProps<HTMLInputElement> {
  currentRefinement: string;
  refine(value: string): void;
  translations: {
    placeholder: string;
  };
  delay?: number;
}

const CustomSearchBox = ({
  currentRefinement,
  refine,
  translations,
  onFocus,
  delay = 50,
}: CustomSearchBoxProps) => {
  const [query, setQuery] = useState(currentRefinement);

  const onChangeDebounced = debounce((event) => {
    const { value } = event.target;
    refine(value);
  }, delay);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value !== query) {
        onChangeDebounced(event);
        setQuery(event.target.value);
      }
    },
    [query]
  );

  useEffect(() => {
    setQuery(currentRefinement);
  }, [currentRefinement]);

  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder={translations.placeholder}
      value={query}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};

export const SearchBox = connectSearchBox(CustomSearchBox);

export default SearchBox;
