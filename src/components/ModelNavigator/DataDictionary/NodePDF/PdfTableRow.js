import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { FontRegistry } from "./util";
import keyIcon from "./assets/key_icon.png";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: "5px",
  },
  evenRow: {
    backgroundColor: "#f4f5f5",
  },
  tableCol: {
    width: "24%",
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
    width: "30%",
  },
  tableColRequired: {
    width: "12%",
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: "break-word",
    paddingLeft: "2px",
    paddingTop: "5px",
    paddingBottom: "5px",
    lineHeight: 1.2,
    fontFamily: FontRegistry("NunitoNormal"),
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
  keyIcon: {
    width: "12px",
    alignItems: "center",
  },
  required: {
    color: "#ff5a20",
    fontFamily: FontRegistry("NunitoExtraBold"),
  },
  preferred: {
    fontFamily: FontRegistry("NunitoNormal"),
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: FontRegistry("NunitoExtraBold"),
  },
  labeled: {
    fontSize: 8,
  },
  labeledContainer: {
    marginTop: "16px",
  },
  cdeInfoContainer: {
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "#e8f0fe",
  },
  cdeInfoTitle: {
    fontSize: 10,
    fontFamily: FontRegistry("NunitoExtraBold"),
    marginBottom: "4px",
  },
  cdeInfoRow: {
    fontSize: 8,
    fontFamily: FontRegistry("NunitoNormal"),
    paddingLeft: "2px",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
});

const PdfTableRow = ({ node }) => {
  const keys = Object.keys(node.properties);

  const textContent = (text, symbol) => {
    if (String(text).length > 20) {
      return String(text).replace(symbol, `${symbol}\n`);
    }
    return text;
  };

  const validateEnums = (enums) => {
    if (Array.isArray(enums)) {
      return enums.map((value) => `'${value}'`).join(", ");
    }
    return JSON.stringify(enums);
  };

  const validateType = (property) => {
    if (Array.isArray(property)) {
      return property.length > 10
        ? textContent(`${property.join(", ")}`, "_")
        : property.join(", ");
    }
    const type = typeof property;
    return type === "object"
      ? textContent(JSON.stringify(property), "]")
      : property;
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
      return (
        <Text style={{ ...styles.tableCell, ...styles.preferred }}>
          Preferred
        </Text>
      );
    }
    return <Text style={styles.tableCell}>Optional</Text>;
  };

  const displayKeyPropsDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <Text key={index} style={styles.tableCell}>
        {line}
      </Text>
    ));
  };

  const getStyles = (classes, index) =>
    index % 2 === 0 ? { ...classes, ...styles.evenRow } : { ...classes };

  const rows = keys.map((key, index) => (
    <View style={getStyles(styles.row, index)} key={key}>
      <View style={styles.tableCol}>
        {node.properties[key].key ? (
          <View
            style={
              String(key).length > 20
                ? styles.tableColKey2
                : styles.tableColKey1
            }
          >
            <Text style={styles.key}>
              {key}{" "}
              <Image style={styles.keyIcon} src={keyIcon} alt="key icon" />
            </Text>
          </View>
        ) : (
          <Text style={styles.tableCell}>{textContent(key, "_")}</Text>
        )}
      </View>
      <View style={styles.tableColType}>
        {node.properties[key].enum ? (
          <Text style={styles.tableCell}>
            {"Acceptable Values: "}
            {validateEnums(node.properties[key].enum)}
          </Text>
        ) : (
          <Text style={styles.tableCell}>
            {validateType(node.properties[key].type)}
          </Text>
        )}
      </View>
      <View style={styles.tableColRequired}>{required(key)}</View>
      <View style={styles.tableColDesc}>
        {node.properties[key].key ? (
          <>
            <Text>
              {displayKeyPropsDescription(node.properties[key].description)}
            </Text>
            {node.properties[key].labeled && (
              <Text style={styles.labeledContainer}>
                <Text style={styles.boldLabeled}>Displayed as:</Text>
                <Text
                  style={styles.labeled}
                >{` ${node.properties[key].labeled}`}</Text>
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.tableCell}>
              {node.properties[key].description}
            </Text>
            {node.properties[key].labeled && (
              <Text style={styles.labeledContainer}>
                <Text style={styles.boldLabeled}>Displayed as:</Text>
                <Text
                  style={styles.labeled}
                >{` ${node.properties[key].labeled}`}</Text>
              </Text>
            )}
          </>
        )}
      </View>
      <View style={styles.tableColSource}>
        <Text style={styles.tableCell}>
          {textContent(node.properties[key].src, "/")}
        </Text>
      </View>
    </View>
  ));

  return (
    <>
      {rows}
      {true && (
        <View style={styles.cdeInfoContainer}>
          <Text style={styles.cdeInfoTitle}>CDE Info</Text>
          <Text style={styles.cdeInfoRow}>CDE Full Name</Text>
          <Text style={styles.cdeInfoRow}>
            Subject Legal Adult Or Pediatric Participant Type
          </Text>
          <Text style={styles.cdeInfoRow}>Version: 1.00</Text>
          <Text style={styles.cdeInfoRow}>Public ID: 11524549</Text>
          <Text style={styles.cdeInfoRow}>Origin: caDSR</Text>
        </View>
      )}
    </>
  );
};

export default PdfTableRow;
