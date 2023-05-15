import React, { ReactNode, useState } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import FilterDropdown from "../dropdowns/FilterDropdown";

interface IKeywordDivProps extends React.HTMLProps<HTMLDivElement> {
  keywords: string[];
  children: React.ReactNode;
}

const KeywordDiv = ({
  keywords,
  children,
  className,
  ...rest
}: IKeywordDivProps): JSX.Element => {
  const keywordString = keywords.join(", ");
  console.log({ keywords, children, className, rest });
  return (
    <div
      data-keywords={keywordString}
      className={styles.filteredColumn}
      {...rest}
    >
      {children}
    </div>
  );
};

type IconProp =
  | IconName
  | JSX.Element
  | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);

interface IFilterHeaderProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  toggle?: boolean;
  keywords: { icon?: IconProp; keyword: string }[];
  subtle?: boolean;
  noMatchFallback?: JSX.Element;
}

const FilterHeader = ({
  title,
  toggle,
  keywords,
  children,
  className,
  subtle = false,
  noMatchFallback,
  ...rest
}: IFilterHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeKeywords, setActiveKeywords] = useState<string[]>(
    keywords.map((kw) => kw.keyword)
  );

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeywordToggle = (keyword: string): void => {
    if (activeKeywords.includes(keyword)) {
      setActiveKeywords(activeKeywords.filter((k) => k !== keyword));
    } else {
      setActiveKeywords([...activeKeywords, keyword]);
    }
  };

  const matchingChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const props: IKeywordDivProps = child.props;

    if (props?.keywords?.some((kw) => activeKeywords.includes(kw))) {
      return child;
    }
    return null;
  });

  return (
    <>
      <div className={styles.header} onClick={toggle ? toggleOpen : undefined}>
        <h3>
          {title}:
          {activeKeywords.length > 0
            ? keywords
                .filter((kw) => activeKeywords.includes(kw.keyword))
                .map((kw, index) => (
                  <span key={index} className={styles.keyword}>
                    {subtle && kw.icon ? (
                      typeof kw.icon === "function" ? (
                        <>{kw.icon({})}</>
                      ) : typeof kw.icon === "string" ? (
                        <FontAwesomeIcon
                          className={styles.buttonIcon}
                          icon={["fas", kw.icon]}
                        />
                      ) : (
                        kw.icon || null
                      )
                    ) : (
                      <>
                        {typeof kw.icon === "function" ? (
                          <>{kw.icon({})}</>
                        ) : typeof kw.icon === "string" ? (
                          <FontAwesomeIcon
                            className={styles.buttonIcon}
                            icon={["fas", kw.icon]}
                          />
                        ) : (
                          kw.icon || null
                        )}
                        {kw.keyword}
                      </>
                    )}
                    {index !== activeKeywords.length - 1 ? ", " : ""}
                  </span>
                ))
            : "No Keywords Selected"}
        </h3>
        {toggle && (
          <FontAwesomeIcon
            icon={isOpen ? "angle-double-down" : "angle-double-up"}
          />
        )}
      </div>
      {isOpen && (
        <div className={className} {...rest}>
          <FilterDropdown
            keywords={keywords.map((kw) => kw.keyword)}
            activeKeywords={activeKeywords}
            onKeywordToggle={handleKeywordToggle}
          />
          <div className={styles.content}>
            {matchingChildren?.length && matchingChildren.length > 0
              ? matchingChildren
              : noMatchFallback}
          </div>
        </div>
      )}
    </>
  );
};

export { FilterHeader, KeywordDiv };
