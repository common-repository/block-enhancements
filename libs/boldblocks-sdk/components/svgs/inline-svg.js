/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { sanitizeSVG, getSVGNode, parseInlineStyle } from "../../utils";

/**
 * Build a react component SVG from svg markup
 *
 * @param {InlineSVGProps}
 *
 * @returns {ReactComponent}
 */
const InlineSVG = ({
  instanceId,
  markup = "",
  title = "",
  description = "",
  preserveAspectRatio,
  sanitizeAttribute = (name, value) => value,
  deprecatedSVGLabelledby = false,
  ...otherProps
}) => {
  // Sanitize svg markup.
  markup = sanitizeSVG(markup);

  if (!markup) {
    return null;
  }

  const svgNode = getSVGNode(markup);
  if (!svgNode) {
    return null;
  }

  // Remove xmlns
  // svgNode.removeAttribute("xmlns");

  // Override preserveAspectRatio attribute
  if (!!preserveAspectRatio) {
    svgNode.setAttribute("preserveAspectRatio", preserveAspectRatio);
  }

  let additionalMarkup = "";
  if (!!title) {
    additionalMarkup = `<title id="{{TITLE_ID}}">${title}</title>`;
  }

  if (!!description) {
    additionalMarkup += `<desc id="{{DESC_ID}}">${description}</desc>`;
  }

  // Needs to add title and/or description
  if (additionalMarkup) {
    // Get/create an id for the svg element.
    let svgId = svgNode.getAttribute("id");
    if (!svgId) {
      svgId = `svg_block_${instanceId}`;
      svgNode.setAttribute("id", svgId);
    }

    const titleId = `${svgId}_title`;
    const descId = `${svgId}_desc`;

    // Add id.
    additionalMarkup = additionalMarkup
      .replace("{{TITLE_ID}}", titleId)
      .replace("{{DESC_ID}}", descId);

    let labelledby;
    let describedby;
    if (deprecatedSVGLabelledby) {
      if (!!title && !!description) {
        labelledby = `${titleId} ${descId}`;
      } else {
        if (!!title) {
          labelledby = `${titleId}`;
        } else if (!!description) {
          labelledby = `${descId}`;
        }
      }
    } else {
      if (!!title) {
        labelledby = `${titleId}`;
      }

      if (!!description) {
        describedby = `${descId}`;
      }
    }

    svgNode.insertAdjacentHTML("afterbegin", additionalMarkup);

    if (labelledby) {
      svgNode.setAttribute("aria-labelledby", labelledby);
    }

    if (describedby) {
      svgNode.setAttribute("aria-describedby", describedby);
    }

    svgNode.setAttribute("role", "img");
  }

  let svgProps = {};
  let attributes = svgNode.attributes;

  if (attributes && attributes.length > 0) {
    for (let i = 0; i < attributes.length; i++) {
      let key = attributes[i].name;
      let attrValue = attributes[i].value;
      if (key === "class") {
        key = "className";
      } else if (key === "style") {
        if (attrValue) {
          attrValue = parseInlineStyle(attrValue);
        } else {
          attrValue = {};
        }
      }

      svgProps[key] = sanitizeAttribute(key, attrValue);
    }
  }

  return (
    <svg
      {...svgProps}
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: svgNode.innerHTML }}
    />
  );
};

export default InlineSVG;
