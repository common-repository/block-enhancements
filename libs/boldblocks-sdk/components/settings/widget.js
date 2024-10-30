/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";
import { isFunction } from "lodash";

/**
 * WordPress dependencies
 */
import { cleanForSlug } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { useLocalStorage } from "../../utils";

const WidgetStyled = styled.div`
  &.is-full-row {
    grid-column: span 2;
  }

  &.is-header-hidden {
    .inside {
      padding: 12px;
    }

    @media (min-width: 1080px) {
      margin: 0;
    }
  }

  .postbox-header {
    .hndle {
      cursor: pointer;
    }
  }

  .inside {
    margin: 0;
  }

  .postbox-footer {
    padding: 12px;
    border-top: 1px solid #f0f0f1;
  }

  &.closed .postbox-footer {
    display: none;
  }

  .components-notice {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 8px;
    margin-right: 0;
    margin-left: 0;
    box-sizing: border-box;
  }
`;

// Block of content inside a widget.
export const Fieldset = styled.div`
  padding: 12px 16px;
  margin-top: 12px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 2px;

  .fieldset__label {
    margin-bottom: 12px;
  }

  .fieldset__list {
    margin-bottom: 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 1rem;
  }

  .file-upload {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 0.5em;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Widget = ({
  title,
  settingsName = "boldblocks-settings",
  children,
  renderFooter = null,
  isFullRow = false,
  isHeaderHidden = false,
  className,
  initialOpen = true,
}) => {
  const cacheKey = `${settingsName}-${cleanForSlug(title)}`;
  const [collapseState, setCollapseState] = useLocalStorage(
    cacheKey,
    !initialOpen,
  );
  return (
    <WidgetStyled
      className={clsx("postbox", className, {
        ["closed"]: collapseState,
        ["is-full-row"]: isFullRow,
        "is-header-hidden": isHeaderHidden,
      })}
    >
      {!isHeaderHidden && (
        <div
          className="postbox-header"
          aria-expanded={collapseState ? "false" : "true"}
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            setCollapseState(!collapseState);
          }}
        >
          <h2 className="hndle">{title}</h2>
          <div className="handle-actions hide-if-no-js">
            <button
              type="button"
              className="handlediv"
              aria-expanded={collapseState ? "false" : "true"}
              onClick={(e) => {
                e.preventDefault();
                setCollapseState(!collapseState);
              }}
            >
              <span className="screen-reader-text">Toggle panel: {title}</span>
              <span
                className="toggle-indicator"
                aria-hidden={collapseState ? "true" : "false"}
              ></span>
            </button>
          </div>
        </div>
      )}
      <div className="inside">{children}</div>
      {isFunction(renderFooter) && (
        <div className="postbox-footer">{renderFooter()}</div>
      )}
    </WidgetStyled>
  );
};
