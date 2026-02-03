import React from "react";
import { Text } from "@react-pdf/renderer";

/**
 * Splits text into individual characters to allow wrapping in PDF
 *
 * @see https://github.com/diegomura/react-pdf/issues/248#issuecomment-2154298745
 * @param {string} text - text to be wrapped
 * @returns JSX elements with each character in its own Text component
 */
export const wrappableText = (text) => {
  if (!text) {
    return null;
  }

  return text
    .split("")
    .map((char, idx) => <Text key={`char-${idx}`}>{char}</Text>);
};

