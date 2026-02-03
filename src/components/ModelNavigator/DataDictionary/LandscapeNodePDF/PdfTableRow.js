import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FontRegistry } from "./util";
import { wrappableText } from "../Utils/pdfUtils";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: "5px",
  },
  test: {
    flexDirection: "row",
  },
  horizontalCells: {
    flexDirection: "row",
    paddingBottom: "5px",
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: FontRegistry("NunitoExtraBold"),
  },
  labeledContainer: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  evenRow: {
    backgroundColor: "#f4f5f5",
  },
  tableCol: {
    width: "24%",
  },
  tableCol2: {
    width: "24%",
  },
  tableColKey: {
    width: "4%",
  },
  tableColType: {
    width: "18%",
  },
  tableColSource: {
    width: "14%",
    paddingLeft: 5,
  },
  tableColDesc: {
    textAlign: "left",
    width: "100%",
  },
  tableColRequired: {
    width: "12%",
  },
  labeled: {
    fontSize: 8,
  },
  cellHeader: {
    fontSize: "6px",
    overflowWrap: "break-word",
    fontWeight: "600",
    paddingLeft: "6px",
    paddingTop: "5px",
    lineHeight: 1.2,
    fontFamily: FontRegistry("NunitoSans"),
    textAlign: "justify",
    width: "78px",
  },
  cdeCells: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: "16px",
  },
  cellHorizontalHeader: {
    fontSize: "6px",
    overflowWrap: "break-word",
    fontWeight: "600",
    paddingLeft: "6px",
    paddingTop: "5px",
    lineHeight: 1.2,
    fontFamily: FontRegistry("NunitoSans"),
    textAlign: "justify",
    width: "70.5px",
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: "break-word",
    paddingTop: "3px",
    paddingBottom: "5px",
    lineHeight: 1.2,
    fontFamily: FontRegistry("NunitoNormal"),
    width: "100%",
    textAlign: "justify",
  },
  descriptionCell: {
    width: "100%",
    paddingLeft: "6px",
  },
  horizontalTableCell: {
    fontSize: 8,
    overflowWrap: "break-word",
    paddingTop: "3px",
    lineHeight: 1.2,
    fontFamily: FontRegistry("NunitoNormal"),
    width: "126px",
    textAlign: "justify",
  },
  key: {
    fontSize: 8,
    color: "#0d71a3",
    paddingLeft: "2px",
    paddingTop: "5px",
    paddingBottom: "5px",
    lineHeight: 1.2,
    width: "90%",
    fontFamily: FontRegistry("NunitoSemiBold"),
  },
  tableColKey1: {
    width: "90%",
    justifyContent: "center",
  },
  brText: {
    marginTop: "8px",
    marginBottom: "2px",
    fontFamily: FontRegistry("NunitoNormal"),
    fontSize: 8,
    width: "100%",
  },
  tableColKey2: {
    width: "114%",
  },
  keyText: {
    marginRight: "10px",
  },
  keyIcon: {
    width: "12px",
    marginLeft: "20px",
  },
  keyIconView: {
    position: "absolute",
    left: "20px",
  },
  required: {
    color: "#ff5a20",
    fontFamily: FontRegistry("NunitoExtraBold"),
  },
  regexPatternLabel: {
    fontSize: "6px",
    fontWeight: "600",
    fontFamily: FontRegistry("NunitoSans"),
    paddingTop: "3px",
    lineHeight: 1.2,
  },
  regexPatternCode: {
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  regexPatternText: {
    fontSize: 8,
    fontFamily: FontRegistry("NunitoNormal"),
    color: "#333333",
    flexShrink: 1,
  },
});

const PdfTableRow = ({ propInfo, node, thisProperty }) => {
  const textContent = (text, symbol) => {
    if (String(text).length > 20) {
      return String(text).replace(symbol, `${symbol}\n`);
    }
    return text;
  };

  const getTableCell = (str) => {
    if (!str) {
      return "-";
    }
    return (
      typeof str === "string" && <Text style={styles.tableCell}>{str}</Text>
    );
  };

  const validateEnums = (enums) => {
    if (Array.isArray(enums)) {
      let concatEnums = "";
      [...enums]
        .sort((a, b) => a?.toLowerCase()?.localeCompare(b?.toLowerCase()))
        .forEach((value) => {
          concatEnums += textContent(`'${value}'; `, "/");
        });
      return concatEnums;
    }
    return JSON.stringify(enums);
  };

  const validateType = (property) => {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        return textContent(`${property}`, "_");
      }
      return property;
    }
    const type = typeof property;
    if (
      type === "object" &&
      typeof property.value_type === "string" &&
      property.value_type === "list"
    ) {
      return "list";
    }
    if (type === "object") {
      if (property !== null && typeof property.pattern === "string") {
        return null;
      }
      return textContent(JSON.stringify(property), "]");
    }
    return property;
  };

  const isPatternType = (property) => {
    return (
      typeof property === "object" &&
      property !== null &&
      typeof property.pattern === "string"
    );
  };

  const required = (key) => {
    if (node.required.includes(key)) {
      return (
        <Text style={{ ...styles.tableCell, ...styles.required }}>
          Required
        </Text>
      );
    }
    if (node.preferred.includes(key)) {
      return <Text style={styles.tableCell}>Preferred</Text>;
    }
    return <Text style={styles.tableCell}>Optional</Text>;
  };

  const displayKeyPropsDiscription = (description) => {
    const lines = description.split("<br>");
    return lines[0];
  };

  const displayKeyPropsDescriptionBlurb = (description) => {
    const lines = description.split("<br>");
    return lines[1];
  };

  return (
    <View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>DESCRIPTION</Text>
        <View style={styles.tableColDesc}>
          {propInfo.key ? (
            <>
              <Text style={styles.tableCell}>
                {displayKeyPropsDiscription(propInfo.description)}
              </Text>

              <Text style={styles.brText}>
                {displayKeyPropsDescriptionBlurb(propInfo.description)}
              </Text>
              {propInfo.labeled && (
                <Text style={styles.labeledContainer}>
                  <Text style={styles.boldLabeled}>Displayed as:</Text>
                  <Text style={styles.labeled}>{` ${propInfo.labeled}`}</Text>
                </Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.tableCell}>{propInfo.description}</Text>
              {propInfo.labeled && (
                <Text style={styles.labeledContainer}>
                  <Text style={styles.boldLabeled}>Displayed as:</Text>
                  <Text style={styles.labeled}>{` ${propInfo.labeled}`}</Text>
                </Text>
              )}
            </>
          )}
        </View>
      </View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>TYPE</Text>
        <View style={styles.tableColDesc}>
          {propInfo.enum ? (
            <Text style={styles.tableCell}>
              {typeof propInfo?.type?.value_type === "string" &&
              propInfo?.type.value_type === "list"
                ? "list\n\n"
                : ""}
              {"Acceptable Values: "}
              {validateEnums(propInfo.enum)}
            </Text>
          ) : isPatternType(propInfo.type) ? (
            <>
              <Text style={styles.regexPatternLabel}>REGEX PATTERN:</Text>
              <View style={styles.regexPatternCode}>
                <Text style={styles.regexPatternText}>
                  {wrappableText(propInfo.type.pattern)}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.tableCell}>{validateType(propInfo.type)}</Text>
          )}
        </View>
      </View>
      <View style={styles.horizontalCells}>
        <Text style={styles.cellHorizontalHeader}>REQUIRED</Text>
        <Text style={styles.horizontalTableCell}>{required(thisProperty)}</Text>

        <Text style={styles.cellHeader}>SOURCE</Text>
        <Text style={styles.horizontalTableCell}>
          {textContent(propInfo.src, "/")}
        </Text>
        {propInfo.labeled && (
          <>
            <Text style={{ ...styles.cellHeader }}>DISPLAYED AS</Text>
            <Text style={styles.horizontalTableCell}>{propInfo.labeled}</Text>
          </>
        )}
      </View>
      {propInfo?.Term?.length > 0 && (
        <>
          <View style={styles.horizontalCells}>
            <Text style={styles.cellHorizontalHeader}>CDE FULL NAME</Text>
            <Text style={styles.horizontalTableCell}>
              {getTableCell(propInfo?.Term?.map((term) => term.Value).join(", "))}
            </Text>

            <Text style={styles.cellHeader}>VERSION</Text>
            <Text style={styles.horizontalTableCell}>
              {getTableCell(propInfo?.Term?.map((term) => term.Version).join(", "))}
            </Text>

            <Text style={styles.cellHeader}>PUBLIC ID</Text>
            <Text style={styles.horizontalTableCell}>
              {getTableCell(propInfo?.Term?.map((term) => term.Code).join(", "))}
            </Text>
          </View>
          <View style={styles.horizontalCells}>
            <Text style={styles.cellHorizontalHeader}>ORIGIN</Text>
            <Text style={styles.horizontalTableCell}>
              {getTableCell(propInfo?.Term?.map((term) => term.Origin).join(", "))}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PdfTableRow;
