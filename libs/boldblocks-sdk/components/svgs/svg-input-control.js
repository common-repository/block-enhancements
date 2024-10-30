/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextareaControl, Button, ExternalLink } from "@wordpress/components";

/**
 * Internal dependencies
 */
import SVGUploadControl from "./svg-upload-control";

const SVGInputControlStyled = styled.div`
  .svg-input-control {
    &__label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__actions {
      display: flex;
      gap: 8px;
      margin: 6px 0;
    }

    &__input {
      margin: 8px 0 4px;

      > * {
        margin-bottom: 0;
      }
    }
  }
`;

/**
 * Input a block icon
 *
 * @param {Object}
 */
const SVGInputControl = ({
  label = __("Input SVG"),
  inputLabel = __("Or input SVG markup"),
  browseLibraryLabel = __("Get icon from library"),
  uploadLabel = __("Upload SVG"),
  clearLabel = __("Clear SVG"),
  toggleLibraryModal,
  value,
  onChange,
  help = (
    <>
      {__(
        "You can upload an SVG file or input SVG markup directly or choose an icon from the library - a collection of icons from Dashicons, WordPress, Ionicons, Bootstrap Icons.",
      )}
      <br />
      {__(
        "We recommend using SVGO to optimize custom SVG files before uploading them. Here is the",
      )}
      &nbsp;
      <ExternalLink href="https://jakearchibald.github.io/svgomg/">
        {__("Web GUI for SVGO")}
      </ExternalLink>
    </>
  ),
  Actions = null,
  placeholder,
  rows = 4,
  className,
  ...props
}) => {
  return (
    <SVGInputControlStyled
      className={clsx("svg-input-control", className)}
      {...props}
    >
      {!!label && <div className="svg-input-control__label">{label}</div>}
      <div className="svg-input-control__actions">
        {toggleLibraryModal && (
          <Button
            variant="primary"
            size="small"
            onClick={() => toggleLibraryModal(true)}
          >
            {browseLibraryLabel}
          </Button>
        )}
        <SVGUploadControl
          label={uploadLabel}
          size="small"
          onChange={onChange}
        />
      </div>
      <TextareaControl
        label={inputLabel}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="svg-input-control__input"
      />
      <div className="svg-input-control__actions">
        <Button
          variant="primary"
          disabled={!value}
          size="small"
          onClick={() => onChange("")}
        >
          {clearLabel}
        </Button>
        {Actions}
      </div>
      {help && <div className="svg-input-control__help">{help}</div>}
    </SVGInputControlStyled>
  );
};

export default SVGInputControl;
