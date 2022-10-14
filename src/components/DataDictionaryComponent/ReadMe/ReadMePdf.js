import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
} from '@react-pdf/renderer';
import PdfHeader from '../DataDictionary/NodePDF/PdfHeader';
import PdfFooter from '../DataDictionary/NodePDF/PdfFooter';
import { FontRegistry } from '../DataDictionary/NodePDF/util';

const styles = StyleSheet.create({
  page: {
    padding: '40px 40px 69px 40px',
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  logo: {
    float: 'left',
    width: '46%',
  },
  tableContainer: {
    border: '1px solid #C1C1C1',
    marginTop: '60px',
  },
  title: {
    marginTop: '20px',
    marginBottm: '25px',
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: FontRegistry('NunitoBold'),
  },
  space: {
    marginTop: '20px',
  },
  h4: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '10px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  content: {
    color: '#000000',
    fontSize: '9px',
    paddingTop: '-2px',
    lineHeight: 1.2,
    marginLeft: '10px',
    overflowWrap: 'break-word',
    width: '500px',
    textAlign: 'justify',
    fontFamily: FontRegistry('NunitoNormal'),
  },
});

const PdfTemplate = ({
  title,
  content,
}) => {
  const renderSubHeader = (text, count) => {
    switch(count) {
      case 1:
        return <Text style={styles.h1}>{text}</Text>;
      case 2:
        return <Text style={styles.h2}>{text}</Text>;
      case 3:
        return <Text style={styles.h3}>{text}</Text>;
      case 4:
        return <Text style={styles.h4}>{text}</Text>;
      default:
        return <Text>{text}</Text>;
    }
  }
  const renderContent = (text) => {
    // split text with newline and generate pdf elements
    const lines = text.split(/\r?\n/);
    const pdfContent = lines.map((item) => {
      const count = (item.match(/#/g) || []).length;
      if (count > 0) {
        // console.log(`${item}`.replaceAll('#', ''));
        return renderSubHeader(item.replaceAll('#', ''), count);
      }
      return <Text style={styles.content}> {item} </Text>
    });
    return pdfContent;
  }
  return (
  <Document>
    <Page style={styles.page} size="A4">
      <PdfHeader />
      <View>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.space}>
        </Text>
        {renderContent(content)}
      </View>
      <PdfFooter />
    </Page>
  </Document>
)};

export default PdfTemplate;
