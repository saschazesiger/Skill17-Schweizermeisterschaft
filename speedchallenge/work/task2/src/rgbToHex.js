/**
 * ICTSkills 2022 — Trade 17 — Web Technologies
 *
 * Speed challenge — Task 2 — Rgb to hex
 */

/**
 * Write a JavaScript function that given a color in RGB (red, green, blue) converts it to
 * the HEX (hexadecimal) representation of the same color.
 * The return value should already include the leading '#' character which indicates that the
 * color is a hexadecimal string,
 *
 * Example:
 *   Input: 0, 153, 255
 *   Output: #0099ff
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {string}
 */
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



export default rgbToHex;
