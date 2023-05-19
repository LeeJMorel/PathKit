import {
  InstantMeiliSearchInstance,
  instantMeiliSearch,
} from "@meilisearch/instant-meilisearch";
import React, { useEffect, useRef, useState } from "react";
import {
  InstantSearch,
  connectStateResults,
  InfiniteHits,
  Highlight,
  createInfiniteHitsSessionStorageCache,
} from "react-instantsearch-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "../../hooks";
import { Button } from "../buttons";
import SearchBox from "./SearchBox";
import styles from "./Search.module.scss";

const { TAURI_MEILI_HOST: host = "", TAURI_MEILI_API_KEY: apiKey = "" } =
  import.meta.env;

let searchClient: InstantMeiliSearchInstance;
if (host && apiKey) {
  try {
    searchClient = instantMeiliSearch(host, apiKey, {
      primaryKey: "_id",
    });
  } catch (error) {
    console.error(error);
  }
}

interface LoadingIndicator {
  isSearching?: boolean;
  isSearchStalled?: boolean;
  onClear: () => void;
}

const LoadingOrClear = ({
  isSearching,
  isSearchStalled,
  onClear,
}: LoadingIndicator) =>
  isSearchStalled && isSearching ? (
    <FontAwesomeIcon className={styles.loader} icon="spinner" spin />
  ) : (
    <Button
      className={styles.searchClearButton}
      onClick={onClear}
      icon="close"
      variant="text"
    />
  );

const ConnectedLoadingOrClear = connectStateResults(LoadingOrClear);

const sessionStorageCache = createInfiniteHitsSessionStorageCache();

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("bestiary");
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    searchClient;
  }, []);

  useOnClickOutside(searchRef, () => setFocused(false));

  const handleSearchStateChange = (searchState: {
    query: React.SetStateAction<string>;
  }) => {
    if (searchState.query !== query) {
      setQuery(searchState.query);
    }
  };

  const handleClear = () => {
    setQuery("");
    setFocused(false);
  };

  // TODO show the selected item in the sheet. Requires new schema.
  const handleSelect = (item: any) => {};

  // Maybe allow changing indexes?
  // const handleIndexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setSelectedIndex(value);
  // };

  const Hit = ({ hit }: any) => (
    <li
      key={hit._id}
      className={styles.resultsListItem}
      // onClick={() => handleSelect(hit)}
    >
      {hit.img && (
        // Only works on foundry images
        <img
          className={styles.resultImage}
          src={`https://demo.foundryvtt.com/${hit.img}`}
          alt={hit.type}
        />
      )}
      <div className={styles.resultDetails}>
        <Highlight
          attribute="name"
          className={styles.resultHighlight}
          hit={hit}
        />
        <span className={styles.resultDescription}>
          Creature type:{" "}
          <Highlight hit={hit} attribute={"system.details.creatureType"} />
        </span>
      </div>
    </li>
  );

  return (
    searchClient && (
      <div className={styles.searchContainer} ref={searchRef}>
        <InstantSearch
          indexName={selectedIndex}
          searchClient={searchClient}
          onSearchStateChange={handleSearchStateChange}
          searchState={{ query }}
        >
          <div className={styles.searchBoxContainer}>
            <div className={styles.searchInputContainer}>
              <SearchBox
                translations={{ placeholder: "Search PathFinder 2e..." }}
                onFocus={() => setFocused(true)}
              />

              <ConnectedLoadingOrClear
                onClear={handleClear}
                isSearching={!!(query && focused)}
              />
            </div>
            {/* <select
              name="index"
              value={selectedIndex}
              onChange={handleIndexChange}
              className={styles.searchIndexSelect}
            >
              <option value="bestiary">Bestiary</option>
            </select> */}
          </div>
          {query && focused && (
            <InfiniteHits hitComponent={Hit} cache={sessionStorageCache} />
          )}
        </InstantSearch>
      </div>
    )
  );
};

export default Search;
