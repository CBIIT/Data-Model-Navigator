import React from 'react';
import {
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logo from './assets/icdc_nih_logo.png';
import store from '../../../../store';

const styles = StyleSheet.create({
  logo: {
    float: 'left',
    width: '50%',
  },
  hr: {
    height: '2px',
    marginTop: '5px',
    backgroundColor: '#0b3556',
  },
});

const PdfHeader = () => {
  const { ddgraph } = store.getState() || {};
  const { pdfDownloadConfig } = ddgraph || {};

  return (
    <>
      <Image style={styles.logo} src={pdfDownloadConfig?.iconSrc || logo} />
      <div style={styles.hr} />
    </>
  );
};

export default PdfHeader;
