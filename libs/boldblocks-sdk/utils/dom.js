export const getSVGNode = (markup) => {
  const tempNode = document.createElement("div");
  tempNode.innerHTML = markup;

  if (
    tempNode.firstElementChild &&
    tempNode.firstElementChild?.nodeName === "svg"
  ) {
    return tempNode.firstElementChild;
  }

  return null;
};

export function parseInlineStyle(style) {
  const template = document.createElement("template");
  template.setAttribute("style", style);
  return Object.entries(template.style)
    .filter(([key]) => !/^[0-9]+$/.test(key))
    .filter(([, value]) => Boolean(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
export const toType = (object) => {
  if (object === null || object === undefined) {
    return `${object}`;
  }

  return Object.prototype.toString
    .call(object)
    .match(/\s([a-z]+)/i)[1]
    .toLowerCase();
};
