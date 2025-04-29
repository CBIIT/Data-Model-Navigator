import { DefaultIcon, IconMap } from "../config/IconMap"

/**
 * A utility function to retrieve icon details based on the category of the node.
 * 
 * The CategoryIconMap allows customization of remapping which category corresponds to which icon.
 * 
 * If this map is not provided, it will default to the fallback functionality, which just uses the
 * name of the category as the key in the IconMap.
 * 
 * If the map IS PROVIDED, all categories must be specified, otherwise the default icon will be used. 
 * 
 * @param {string} category The category of the node to retrieve the icon for.
 * @param {Object.<string, string>|null} [CategoryIconMap] The map of categories to icon details. If null, will use the default icon map.
 * @returns {{ svg: string, svg_rounded: string, png: string, color: string, background: string }} An object containing the icon's SVG, PNG, color, and background properties.
 */
export const getIconDetails = (category, CategoryIconMap = null) => {
  // Invalid category was passed, use default icon
  if (!category || typeof category !== 'string') {
    return DefaultIcon;
  }

  // Use the category to icon map if it was provided
  if (CategoryIconMap && typeof CategoryIconMap === 'object') {
    const iconName = CategoryIconMap[category];
    return IconMap[iconName] || DefaultIcon;
  }

  // If no specific map is provided, use the default IconMap (category-to-icon map)
  return IconMap[category] || DefaultIcon;
};
