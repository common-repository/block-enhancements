/**
 * External dependencies
 */
import clsx from "clsx";
import { noop } from "lodash";
import styled from "@emotion/styled";
import List from "list.js";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, useRef } from "@wordpress/element";
import {
  Button,
  Modal,
  Flex,
  FlexItem,
  SearchControl,
  Spinner,
} from "@wordpress/components";
import { ENTER } from "@wordpress/keycodes";

/**
 * Internal dependencies
 */
import { sanitizeSlug } from "../../utils";

// Modal wrapper
const ModalStyled = styled(Modal)`
  // Modal content
  .components-modal__content {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    margin-top: 50px;
    overflow: hidden;

    &::before {
      margin-bottom: 20px;
    }

    > :not(.components-modal__header, .icon-submit) {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
    }
  }

  // Modal header
  .components-modal__header {
    height: 50px;
    padding: 0 20px;
  }

  .icon-library-wrapper {
    flex: 1;
    overflow: hidden;
    content-visibility: hidden;

    &.is-loading,
    &.show-library {
      content-visibility: visible;
    }
  }

  .icon-filter {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    &__search {
      min-width: 220px;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      font-size: 14px;

      > li {
        margin: 0;
      }

      .keyword-label {
        font-weight: 500;
      }

      span {
        display: block;
        padding: 3px 5px;
      }

      .keyword:not(.is-selected) {
        color: var(--wp-admin-theme-color, #007cba);
        cursor: pointer;
      }

      .is-selected {
        font-weight: 500;
        pointer-events: none;
      }
    }

    @media (max-width: 781px) {
      flex-wrap: wrap;

      &__search {
        width: 100%;
      }

      &__keywords {
        margin-top: 8px;
        margin-left: 0 !important;
      }
    }
  }

  .components-search-control > * {
    margin-bottom: 0;
  }

  // Icons list
  .icon-library {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9em, 1fr));
    gap: 0.5em;
    max-height: calc(100% - 110px);
    overflow: auto;

    /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4); */

    svg {
      width: 4em;
      height: 4em;
    }

    .title {
      max-height: 1.7em;
      font-size: 0.85em;
      line-height: 1.5;
      text-align: center;
      word-break: break-word;
    }

    > * {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5em 1em;
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .selected {
      background-color: #ccc;
    }

    &:empty::before {
      display: block;
      width: 100%;
      padding: 2rem;
      text-align: center;
      content: attr(data-empty);
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  // Pagination
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    font-size: 1.5em;

    > li {
      margin: 0 5px;

      &:only-child {
        display: none;
      }

      &.active {
        a {
          color: #3c434a;
        }
      }

      &:not(.active) {
        a {
          cursor: pointer;
        }
      }
    }

    a {
      display: block;
      padding: 5px 10px;
    }
  }
`;

/**
 * Form for inserting icons from the icon library
 *
 * @param {BrowseIconsModalProps} props Component props.
 *
 * @return {WPComponent}.
 */
export function BrowseIconsModal({
  title = __("Icon library"),
  isModalOpen = false,
  setIsModalOpen,
  icons,
  keywords = [],
  value = "",
  onSubmit = noop,
  onCancel = noop,
  className,
}) {
  // Define iconRaw
  const [iconRaw, setIconRaw] = useState(value);
  const disabledSubmit = !iconRaw;

  const libraryRef = useRef(null);
  const [instance, setInstance] = useState(null);
  const isDataReady = icons && icons.length && isModalOpen;
  useEffect(() => {
    if (isDataReady) {
      setInstance(
        new List("icon-library", {
          valueNames: [{ data: ["name", "categories", "tags"] }],
          page: 300,
          pagination: {
            item: "<li><a class='page'></a></li>",
          },
          searchClass: "js-search-icons",
          searchDelay: 500,
        }),
      );

      libraryRef.current.classList.remove("is-loading");
      libraryRef.current.classList.add("show-library");
    }
  }, [isDataReady]);

  // Focus on search box
  const searchRef = useRef(null);
  useEffect(() => {
    if (isDataReady) {
      searchRef.current && searchRef.current.focus();
    }
  }, [isDataReady]);

  // Create submit ref
  const submitRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle modal close event.
  const closeModal = () => {
    setIsModalOpen(false);
    onCancel();
  };

  // Bail if the modal is close
  if (!isModalOpen) {
    return null;
  }

  return (
    <ModalStyled
      title={title}
      closeLabel={__("Close")}
      onRequestClose={() => closeModal()}
      className={clsx("icon-libary-modal", className)}
      isFullScreen
      onKeyDown={(event) => {
        if (event.keyCode === ENTER && !disabledSubmit) {
          let { nodeName } = document.activeElement ?? { nodeName: "" };
          nodeName = nodeName.toLowerCase();

          if (
            !(
              document.activeElement === searchRef.current ||
              (nodeName === "button" &&
                document.activeElement !== submitRef.current)
            )
          ) {
            event.preventDefault();
            onSubmit(iconRaw);

            closeModal();
          }
        }
      }}
    >
      <div
        ref={libraryRef}
        id="icon-library"
        className="icon-library-wrapper is-loading"
      >
        {icons && !!icons.length ? (
          <>
            <Flex className="icon-filter">
              <FlexItem className="icon-filter__search">
                <SearchControl
                  ref={searchRef}
                  placeholder={__("Search icon...")}
                  value={searchTerm}
                  onChange={(value) => {
                    if (searchTerm && searchTerm.length > 1 && !value) {
                      // Click on reset search
                      instance.search("");
                    }

                    setSearchTerm(value);
                  }}
                  className="js-search-icons"
                />
              </FlexItem>
              <FlexItem className="icon-filter__keywords">
                {keywords && !!keywords.length && (
                  <ul className="keywords">
                    <li>
                      <span className="keyword-label">
                        {__("Quick search:")}
                      </span>
                    </li>
                    {instance &&
                      keywords.map((word) => (
                        <li key={word}>
                          <span
                            className={clsx("keyword", {
                              "is-selected": word === searchTerm,
                            })}
                            onClick={() => {
                              instance.search(word);
                              setSearchTerm(word);
                            }}
                          >
                            {word}
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </FlexItem>
            </Flex>
            <div
              className="icon-library list"
              data-empty={__("Nothing found, try searching again.")}
            >
              {icons.map(
                ({ name, title, icon, categories, tags, provider }, index) => (
                  <div
                    key={sanitizeSlug(`${provider}-${name}-${index}`)}
                    data-name={name}
                    data-categories={categories}
                    data-tags={tags}
                    data-provider={provider}
                    className={clsx({ ["selected"]: iconRaw === icon })}
                    onClick={(e) => {
                      if (e?.detail === 2) {
                        onSubmit(icon);
                        closeModal();
                      } else {
                        setIconRaw(icon);
                      }
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: icon }}
                      className="icon"
                    ></div>
                    <span className="title">{title}</span>
                  </div>
                ),
              )}
            </div>
            <ul className="pagination"></ul>
          </>
        ) : (
          <Spinner style={{ margin: "4px" }} />
        )}
      </div>

      <Flex className="icon-submit">
        <FlexItem>
          <Button variant="secondary" onClick={() => closeModal()}>
            {__("Cancel")}
          </Button>
        </FlexItem>
        <FlexItem>
          <Button
            disabled={disabledSubmit}
            variant="primary"
            type="submit"
            ref={submitRef}
            onClick={() => {
              onSubmit(iconRaw);

              closeModal();
            }}
          >
            {__("Insert icon")}
          </Button>
        </FlexItem>
      </Flex>
    </ModalStyled>
  );
}
