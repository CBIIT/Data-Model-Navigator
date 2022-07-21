import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';
import keyIcon from './assets/key_icon.png';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '5px',
  },
  test: {
    flexDirection: 'row',
  },
  horizontalCells: {
    flexDirection: 'row',
    paddingBottom: '5px',
  },
  evenRow: {
    backgroundColor: '#f4f5f5',
  },
  tableCol: {
    width: '24%',
  },
  tableCol2: {
    width: '24%',
  },
  tableColKey: {
    width: '4%',
  },
  tableColType: {
    width: '18%',
  },
  tableColSource: {
    width: '14%',
    paddingLeft: 5,
  },
  tableColDesc: {
    textAlign: 'left',
    width: '30%',
  },
  tableColRequired: {
    width: '12%',
  },
  cellHeader: {
    fontSize: '6px',
    overflowWrap: 'break-word',
    fontWeight: '600',
    paddingLeft: '6px',
    paddingTop: '5px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoSans'),
    textAlign: 'justify',
    width: '10%',
    // backgroundColor: 'red',
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
    width: '350px',
    textAlign: 'justify',
  },
  descriptionCell: {
    width: '100%',
    paddingLeft: '6px',
  },
  horizontalTableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
    width: '126px',
    textAlign: 'justify',
  },
  rowCell: {
    // paddingLeft: '2px',
  },
  key: {
    fontSize: 8,
    color: '#0d71a3',
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    width: '90%',
    // justifyContent: 'left',
    fontFamily: FontRegistry('NunitoSemiBold'),
  },
  tableColKey1: {
    width: '90%',
    justifyContent: 'center',
  },
  tableColKey2: {
    width: '114%',
  },
  keyText: {
    marginRight: '10px',
  },
  keyIcon: {
    width: '12px',
    marginLeft: '20px',
  },
  keyIconView: {
    position: 'absolute',
    left: '20px',
  },
  required: {
    color: '#ff5a20',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
});

const PdfTableRow = ({ propInfo, node, thisProperty }) => {
  const keys = Object.keys(node.properties);
  const textContent = (text, symbol) => {
    if (String(text).length > 20) {
      return String(text).replace(symbol, `${symbol}\n`);
    }
    return text;
  };

  const validateEnums = (enums) => {
    if (Array.isArray(enums)) {
      let concatEnums = '';
      enums.forEach((value) => {
        concatEnums += textContent(`'${value}'; `, '/');
      });
      return concatEnums;
    }
    return JSON.stringify(enums);
  };

  const validateType = (property) => {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        return textContent(`${property}`, '_');
      }
      return property;
    }
    const type = typeof property;
    if (type === 'object') {
      return textContent(JSON.stringify(property), ']');
    }
    return property;
  };

  const required = (key) => {
    if (node.required.includes(key)) {
      return (
        <Text style={{ ...styles.tableCell, ...styles.required }}>Required</Text>
      );
    }
    if (node.preferred.includes(key)) {
      return (
        <Text style={styles.tableCell}>Preferred</Text>
      );
    }
    return <Text style={styles.tableCell}>Optional</Text>;
  };

  const displayKeyPropsDiscription = (description) => {
    const lines = description.split('<br>');
    return lines.map((line, index) => <Text key={index} style={styles.tableCell}>{line}</Text>);
  };

  const getStyles = (classes, index) => ((index % 2 === 0)
    ? { ...classes, ...styles.evenRow } : { ...classes });
  const rows = keys.map((key, index) => (
    <View style={getStyles(styles.row, index)} key={key}>
      <View style={styles.tableCol}>
        {node.properties[key].key ? (
          <>
            <View style={(String(key).length > 20) ? styles.tableColKey2 : styles.tableColKey1}>
              <Text style={styles.key}>
                {key}
                {' '}
                <Image style={styles.keyIcon} src={keyIcon} alt="key icon" />
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.tableCell}>
            {textContent(key, '_')}
          </Text>
        )}
      </View>
      <View style={styles.tableColType}>
        {node.properties[key].enum ? (
          <Text style={styles.tableCell}>
            {'Acceptable Values: '}
            {validateEnums(node.properties[key].enum)}
          </Text>
        ) : (
          <Text style={styles.tableCell}>
            {validateType(node.properties[key].type)}
          </Text>
        ) }
      </View>
      <View style={styles.tableColRequired}>
        {required(key)}
      </View>
      <View style={styles.tableColDesc}>
        {node.properties[key].key ? (
          <>
            {displayKeyPropsDiscription(node.properties[key].description)}
          </>
        ) : (
          <Text style={styles.tableCell}>
            {node.properties[key].description}
          </Text>
        )}
      </View>
      <View style={styles.tableColSource}>
        <Text style={styles.tableCell}>{textContent(node.properties[key].src, '/')}</Text>
      </View>
    </View>
  ));

  return (
    <View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>DESCRIPTION</Text>
        <Text style={{ ...styles.tableCell, ...styles.descriptionCell }}>
          {propInfo.key ? (
            <>
              {displayKeyPropsDiscription(propInfo.description)}
            </>
          ) : (
            <Text style={{ ...styles.tableCell, ...styles.descriptionCell }}>
              {propInfo.description}
            </Text>
          )}
        </Text>
      </View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>TYPE</Text>
        <>
          {propInfo.enum ? (
            <Text style={styles.tableCell}>
              {'Acceptable Values: '}
              {validateEnums(propInfo.enum)}
            </Text>
          ) : (
            <Text style={styles.tableCell}>
              {validateType(propInfo.type)}
            </Text>
          ) }
        </>
      </View>
      <View style={styles.horizontalCells}>
        <Text style={styles.cellHeader}>REQUIRED</Text>
        <Text
          style={{ ...styles.horizontalTableCell, ...styles.rowCell }}
        >
          {required(thisProperty)}

        </Text>

        <Text style={styles.cellHeader}>SOURCE</Text>
        <Text style={styles.horizontalTableCell}>{textContent(propInfo.src, '/')}</Text>

        {
          propInfo.labeled && (
          <>
            <Text style={{ ...styles.cellHeader }}>
              DISPLAYED AS
            </Text>
            <Text style={styles.horizontalTableCell}>{propInfo.labeled}</Text>
          </>
          )
        }
      </View>
    </View>
  );
};

export default PdfTableRow;
