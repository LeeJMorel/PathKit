import React, { useState } from "react";
import {
  InstantSearch,
  InfiniteHits,
  Stats,
  Highlight,
  connectSearchBox,
} from "react-instantsearch-dom";
import "./Search.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import data from "../../../data.ms/movies.json";

//stringify the data
const moviesString = JSON.stringify({ data });

const searchClient = instantMeiliSearch("http://localhost:7700", moviesString);

///This part is our search bar display
interface CustomSearchBoxProps {
  currentRefinement: string;
  refine(value: string): void;
  cssClasses: {
    input: string;
  };
  translations: {
    placeholder: string;
  };
}

const CustomSearchBox = ({
  currentRefinement,
  refine,
  cssClasses,
  translations,
}: CustomSearchBoxProps) => (
  <div className="ais-SearchBox">
    <input
      className={cssClasses.input}
      type="text"
      placeholder={translations.placeholder}
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
    />
  </div>
);

const SearchBoxWithClasses = connectSearchBox(CustomSearchBox);
//end of search bar

type HitProps = {
  hit: {
    id: number;
    title: string;
    overview: string;
    genres: string[];
    poster: string;
    release_date: number;
  };
};

const SearchResult = ({ hit }: HitProps) => {
  const truncatedOverview =
    hit.overview.length > 240
      ? hit.overview.substring(0, 240) + "..."
      : hit.overview;

  return (
    <div className="search-result">
      <div className="hit-name">
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className="hit-description">{truncatedOverview}</div>
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearchStateChange = (searchState: {
    query: React.SetStateAction<string>;
  }) => {
    if (searchState.query !== query) {
      setQuery(searchState.query);
    }
  };

  return (
    <div className={"searchContainer"}>
      <InstantSearch
        indexName="movies"
        searchClient={searchClient}
        onSearchStateChange={handleSearchStateChange}
        searchState={{ query }}
      >
        <Stats />
        <SearchBoxWithClasses
          translations={{ placeholder: "Search PathFinder 2e..." }}
          cssClasses={{ input: "input" }}
        />
        {query && (
          <InfiniteHits
            hitComponent={SearchResult}
            cssClasses={{
              root: "hitRoot",
              emptyRoot: "hitEmptyRoot",
              list: "hitList",
              item: "hitItem",
              loadPrevious: "hitLoadPrevious",
              loadMore: "hitLoadMore",
              disabledLoadPrevious: "hitDisabledLoadPrevious",
              disabledLoadMore: "hitDisabledLoadMore",
            }}
          />
        )}
      </InstantSearch>
    </div>
  );
};

export default Search;
