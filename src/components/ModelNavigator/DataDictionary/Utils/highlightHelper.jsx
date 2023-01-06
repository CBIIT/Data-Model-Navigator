/* eslint-disable no-plusplus */
import React from 'react';import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  Typography,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { getPropertyDescription, getType } from './utils';

const theme = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '2px',
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
        wordBreak: 'break-all',

      },
      gutters: {
        paddingLeft: '0px !important',
        paddingRight: '0px',
        wordBreak: 'break-all',
      },
    },
    MuiListItemText: {
      root: {
        padding: '4px',
        marginTop: '0px',
        marginBottom: '0px',
      },
    },
  },
};

const escapeReturnChar = (str, newlineClassName) => {
  if (!str) return str;
  const pieces = str.split('\\n');
  if (pieces.length <= 1) return str;
  return pieces.map((piece, i) => (
    <span
      key={`span-${i}`}
      className={(i === 0 || i === pieces.length) ? '' : newlineClassName}
    >
      {piece}
    </span>
  ));
};

const displayKeyPropsDescription = (description) => {
  const lines = description.split('<br>');
  if (lines.length > 1){
    return lines.map((line) => <span>{line}</span>);
  }
  return description;
};

export const addHighlightingSpans = (str, indices, spanClassName) => {
  let cursor = 0;
  let currentIndices = 0;
  const resultFragments = [];
  const highlightSpanClassName = `${spanClassName}--highlight`;
  const newlineClassName = `${spanClassName}--new-line`;
  while (currentIndices < indices.length) {
    if (cursor < indices[currentIndices][0]) {
      resultFragments.push(
        (
          <div
            key={cursor}
            className={spanClassName}
          >
            {escapeReturnChar(str.substring(cursor, indices[currentIndices][0]), newlineClassName)}
          </div>
        ),
      );
    }
    resultFragments.push(
      (
        <div
          key={indices[currentIndices][0]}
          className={`${spanClassName} ${highlightSpanClassName}`}
        >
          {
            escapeReturnChar(
              str.substring(
                indices[currentIndices][0],
                indices[currentIndices][1] + 1,
              ),
              newlineClassName,
            )
          }
        </div>
      ),
    );
    cursor = indices[currentIndices][1] + 1;
    currentIndices += 1;
  }
  if (cursor < str.length) {
    resultFragments.push(
      (
        <div
          key={cursor}
          className={spanClassName}
        >
          {displayKeyPropsDescription(escapeReturnChar(str.substring(cursor), newlineClassName))}
        </div>
      ),
    );
  }
  return resultFragments;
};

export const getPropertyNameFragment = (propertyName, matchedItem, spanClassName) => {
  const propertyNameFragment = addHighlightingSpans(
    propertyName,
    matchedItem ? matchedItem.indices : [],
    spanClassName,
  );
  return propertyNameFragment;
};

export const getPropertyTypeFragment = (property, typeMatchList, spanClassName) => {
  const type = getType(property);
  let propertyTypeFragment;
  if (typeof type === 'string') {
    propertyTypeFragment = (
      <>
        {
          addHighlightingSpans(
            type,
            (typeMatchList && typeMatchList[0]) ? typeMatchList[0].indices : [],
            spanClassName,
          )
        }
      </>
    );
  }
  if (Array.isArray(type)) {
    propertyTypeFragment = type.map((t, i) => {
      const matchedTypeItem = typeMatchList && typeMatchList.find(
        (matchItem) => matchItem.value === t,
      );
      if (matchedTypeItem) {
        return (
          <MuiThemeProvider theme={createTheme(theme)}>
            <List>
              <ListItem key={i}>
                {
                  addHighlightingSpans(
                    t,
                    matchedTypeItem.indices,
                    spanClassName,
                  )
                }
              </ListItem>
            </List>
          </MuiThemeProvider>
        );
      }
      return (
        <MuiThemeProvider theme={createTheme(theme)}>
          <List>
            <ListItem key={i}>
              {
                addHighlightingSpans(
                  t,
                  [],
                  spanClassName,
                )
              }
            </ListItem>
          </List>
        </MuiThemeProvider>
      );
    });
  }
  return propertyTypeFragment;
};

export const getPropertyDescriptionFragment = (property, matchedItem, spanClassName) => {
  let descriptionStr = getPropertyDescription(property);
  if (!descriptionStr) descriptionStr = 'No Description';
  const propertyDescriptionFragment = addHighlightingSpans(
    descriptionStr,
    matchedItem ? matchedItem.indices : [],
    spanClassName,
  );
  return propertyDescriptionFragment;
};

export const getNodeTitleFragment = (allMatches, title, spanClassName) => {
  const matchedItem = allMatches.find((item) => item.key === 'title');
  const nodeTitleFragment = addHighlightingSpans(
    title,
    matchedItem ? matchedItem.indices : [],
    spanClassName,
  );
  return nodeTitleFragment;
};

export const getNodeDescriptionFragment = (allMatches, description, spanClassName) => {
  const matchedItem = allMatches.find((item) => item.key === 'description');
  const nodeDescriptionFragment = addHighlightingSpans(
    description,
    matchedItem ? matchedItem.indices : [],
    spanClassName,
  );
  return nodeDescriptionFragment;
};

export const getMatchInsideProperty = (propertyIndex, propertyKey, property, allMatches) => {
  let nameMatch = null;
  let descriptionMatch = null;
  const typeMatchList = [];
  if (allMatches) {
    allMatches.forEach((item) => {
      if (item.key === 'properties.name' && item.value === propertyKey) {
        nameMatch = item;
      } else if (item.key === 'properties.description') {
        const descriptionStr = `${getPropertyDescription(property)}`.toLowerCase();
        const splitText = descriptionStr ? descriptionStr.split('<br>')[0] : descriptionStr;
        if (item.value === splitText) {
          descriptionMatch = item;
        }
      } else if (item.key === 'properties.type') {
        const type = getType(property);
        if (typeof type === 'string') {
          if (type === item.value) {
            typeMatchList.push(item);
          }
        } else if (Array.isArray(type)) {
          for (let a = 0; a < type.length; a++) {
            if (type[a] === item.value) { // TODO: WAS ++
              typeMatchList.push(item);
            }
          }
        }
      }
    });
  }
  return {
    nameMatch,
    descriptionMatch,
    typeMatchList,
  };
};

export const getMatchesSummaryForProperties = (allProperties, allMatches) => {
  const matchedPropertiesSummary = [];
  Object.keys(allProperties).forEach((propertyKey, propertyIndex) => {
    const property = allProperties[propertyKey];
    const {
      nameMatch,
      descriptionMatch,
      typeMatchList,
    } = getMatchInsideProperty(propertyIndex, propertyKey, property, allMatches);
    const summaryItem = {
      propertyKey,
      property,
      nameMatch,
      descriptionMatch,
      typeMatchList,
    };
    if (nameMatch || descriptionMatch || typeMatchList.length > 0) {
      matchedPropertiesSummary.push(summaryItem);
    }
  });
  return matchedPropertiesSummary;
};

export const getNodeTitleSVGFragment = (
  nodeNames,
  matchedNodeNameIndices,
  fontSize,
  textPadding,
  textLineGap,
) => {
  const nodeTitleFragment = [];
  let currentRowIndex = 0;
  let rowStartIndex = 0;
  let rowEndIndex;
  const nodeNameRows = nodeNames;
  let currentHighlightIndex = 0;
  const textAttrBase = {
    x: 0,
    textAnchor: 'middle',
    alignmentBaseline: 'baseline',
    fontSize,
    className: 'graph-node__text',
  };
  const tspanAttrBase = {
    textAnchor: 'middle',
    alignmentBaseline: 'baseline',
    fontSize,
  };
  const tspanAttr = {
    ...tspanAttrBase,
    className: 'graph-node__tspan',
  };
  const tspanHighlightAttr = {
    ...tspanAttrBase,
    className: 'graph-node__tspan graph-node__tspan--highlight',
  };
  while (currentRowIndex < nodeNameRows.length) { // for each row
    const currentRowStr = nodeNameRows[currentRowIndex];
    rowEndIndex = rowStartIndex + currentRowStr.length;
    const textY = textPadding
      + (currentRowIndex * (fontSize + textLineGap));
    const textAttr = {
      ...textAttrBase,
      key: currentRowIndex,
      y: textY + 10,
    };
    let cursorInRow = 0;
    const currentRowFragment = [];

    // Go over all highlighted text in current row
    let index = 0;
    while (currentHighlightIndex < matchedNodeNameIndices.length) {
      const highlightStartIndex = matchedNodeNameIndices[currentHighlightIndex][0];
      const highlightEndIndex = matchedNodeNameIndices[currentHighlightIndex][1] + 1;
      if (highlightStartIndex > rowEndIndex) {
        currentRowFragment.push((
          <tspan key={cursorInRow} {...tspanAttr}>
            {currentRowStr.substring(cursorInRow)}
          </tspan>
        ));
        cursorInRow = currentRowStr.length;
        break;
      }
      const highlightStartIndexInRow = highlightStartIndex - rowStartIndex;
      const highlightEndIndexInRow = highlightEndIndex;

      if (cursorInRow < highlightStartIndexInRow) {
        currentRowFragment.push((
          <tspan key={cursorInRow} {...tspanAttr}>
            {currentRowStr.substring(cursorInRow, highlightStartIndexInRow)}
          </tspan>
        ));
        cursorInRow = highlightStartIndexInRow;
      }
      if (highlightEndIndex <= rowEndIndex) {
        currentRowFragment.push((
          <tspan key={cursorInRow} {...tspanHighlightAttr}>
            {currentRowStr.substring(cursorInRow, highlightEndIndexInRow)}
          </tspan>
        ));
        cursorInRow = highlightEndIndexInRow;
        currentHighlightIndex += 1;
      } else {
        currentRowFragment.push((
          <tspan key={cursorInRow} {...tspanHighlightAttr}>
            {currentRowStr.substring(cursorInRow)}
          </tspan>
        ));
        cursorInRow = currentRowStr.lenght;
        break;
      }
    }

    // Check text in the current row are all added to the list
    if (cursorInRow < currentRowStr.length) {
      currentRowFragment.push((
        <tspan key={cursorInRow} {...tspanAttr}>{currentRowStr.substring(cursorInRow)}</tspan>
      ));
    }

    // Add all fragment of current line to the node title fragment list
    nodeTitleFragment.push((
      <text {...textAttr}>{currentRowFragment}</text>
    ));
    currentRowIndex += 1;
    rowStartIndex += currentRowStr.length + 1;
  } // end of while, go to the next row
  return nodeTitleFragment;
};
