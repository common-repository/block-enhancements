/**
 * External dependencies
 */
import { isArray } from "lodash";

/**
 * WordPress dependencies
 */
import { RichTextData } from "@wordpress/rich-text";

/**
 * Decide which setting fields will be showed based on blockName
 *
 * @param {String} blockName
 * @param {String} settingField
 * @returns {Boolean}
 */
export const hasWithIconSupport = (blockName, settingField) => {
  if (blockName === "core/button") {
    return ["iconPosition", "wrapText"].includes(settingField);
  } else if (blockName === "core/read-more") {
    return ["iconPosition"].includes(settingField);
  } else {
    return ["iconMarginTop"].includes(settingField);
  }
};

const wrapText = (blockName, text, setAttributes) => {
  if (!text || hasWrapElement(text)) {
    return;
  }

  let newText;
  if (isArray(text)) {
    newText = text.map((i) => wrapTextString(i));
  } else {
    newText = wrapTextString(text);
  }

  updateAttributeText(blockName, newText, setAttributes);
};

const getRealText = (text) => {
  if (!text || !hasWrapElement(text)) {
    return text;
  }

  let newText;
  if (isArray(text)) {
    newText = text.map((i) => removeWrapElement(i));
  } else {
    newText = removeWrapElement(text);
  }

  return newText;
};

const unwrapText = (blockName, text, setAttributes) => {
  updateAttributeText(blockName, getRealText(text), setAttributes);
};

/**
 * Maybe wrap text with a span
 *
 * @param {String} blockName
 * @param {Object} attributes
 */
export const maybeWrapText = (blockName, attributes, setAttributes) => {
  const text = getBlockText(blockName, attributes);

  wrapText(blockName, text, setAttributes);
};

/**
 * Maybe wrap text with a span
 *
 * @param {String} blockName
 * @param {Object} attributes
 */
export const maybeUnwrapText = (blockName, attributes, setAttributes) => {
  const text = getBlockText(blockName, attributes);

  if (!text || !hasWrapElement(text)) {
    return;
  }

  unwrapText(blockName, text, setAttributes);
};

/**
 * Get text of the block
 *
 * @param {String} blockName
 * @param {Object} attributes
 * @returns {String|Array}
 */
export const getBlockText = (blockName, attributes) => {
  let text;
  switch (blockName) {
    case "core/button":
      text = attributes?.text;

      break;
    case "core/list":
      text = attributes?.values ?? "";
      if (text) {
        text = text.split("</li><li>");
        text = text.map((i) => i.replace("<li>", "").replace("</li>", ""));
      }

      break;
    case "core/heading":
      text = attributes?.content;

      break;

    default:
      break;
  }

  return text;
};

/**
 * Already has the wrap element or not
 *
 * @param {String|Array} text
 * @returns {Boolean}
 */
const hasWrapElement = (text) => {
  if (isArray(text)) {
    text = text.length ? text[0] : "";
  } else if (RichTextData && text instanceof RichTextData) {
    text = text.originalHTML;
  }

  const fakeDiv = document.createElement("div");
  fakeDiv.innerHTML = text;

  return fakeDiv.querySelector("span.with-icon__text");
};

const wrapTextString = (text) => {
  return `<span class="with-icon__text">${text}</span>`;
};

const removeWrapElement = (text) => {
  if (!text || !hasWrapElement(text)) {
    return text;
  }

  if (RichTextData && text instanceof RichTextData) {
    text = text.originalHTML;
  }

  const fakeDiv = document.createElement("div");
  fakeDiv.innerHTML = text;
  const childNodes = [].slice.call(fakeDiv.childNodes);
  const realText = childNodes.reduce((previous, current) => {
    if (current.nodeType === 1 && current.className === "with-icon__text") {
      previous = `${previous}${current.innerHTML}`;
    } else {
      previous = `${previous}${current.innerHTML ?? current.textContent ?? ""}`;
    }

    return previous;
  }, "");

  return realText;
};

const updateAttributeText = (blockName, text, setAttributes) => {
  switch (blockName) {
    case "core/button":
      setAttributes({ text });
      break;

    case "core/heading":
      setAttributes({ content: text });
      break;

    case "core/list":
      text = text.map((i) => `<li>${i}</li>`).join("");
      setAttributes({ values: text });
      break;

    default:
      break;
  }
};

export const keywords = [
  "flower",
  "star",
  "gear",
  "sharp",
  "shape",
  "arrow",
  "diamond",
  "circle",
  "heart",
  "sign",
  "shield",
  "man",
  "person",
  "car",
  "logo",
  "alert",
  "smile",
  "bell",
  "outline",
];
