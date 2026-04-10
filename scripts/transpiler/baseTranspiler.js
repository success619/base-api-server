/**
 * THE MAP: Define your custom names here
 */
const tagMap = {
  html: "base",
  head: "baseHead",
  div: "cont",
  h1: "firstH",
  h2: "secondH",
  h3: "thirdH",
  p: "para",
  img: "pic",
  ul: "numList",
  ol: "boList",
  aside: "sidePanel",
  button: "pressable",
};

/**
 * CONVERT: HTML -> .BASE
 */
function transpileToBase(html) {
  let result = html;

  Object.entries(tagMap).forEach(([tag, newTag]) => {
    // Matches opening tags and captures attributes: <div class="red"> -> >>cont class="red"<<
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*|)>`, "gi");
    result = result.replace(openRegex, (match, attributes) => {
      return `>>${newTag}${attributes}<<`;
    });

    // Matches closing tags: </div> -> >>!cont<<
    const closeRegex = new RegExp(`</${tag}>`, "gi");
    result = result.replace(closeRegex, `>>!${newTag}<<`);
  });

  return result;
}

/**
 * REVERSE: .BASE -> HTML
 */
function transpileToHtml(base) {
  let result = base;

  Object.entries(tagMap).forEach(([tag, newTag]) => {
    // Reverses opening tags: >>cont class="red"<< -> <div class="red">
    // The [^<>!]* ensures we don't match a closing tag (which starts with !)
    const openRegex = new RegExp(`>>${newTag}(\\s+[^<>!]*)?<<`, "gi");
    result = result.replace(openRegex, (match, attributes) => {
      const attrs = attributes ? attributes : "";
      return `<${tag}${attrs}>`;
    });

    // Reverses closing tags: >>!cont<< -> </div>
    const closeRegex = new RegExp(`>>!${newTag}<<`, "gi");
    result = result.replace(closeRegex, `</${tag}>`);
  });

  return result;
}

module.exports = {
  transpileToBase,
  transpileToHtml,
};
