import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  Button,
} from '@material-ui/core';
import { saveAs } from 'file-saver';
import { ArrowDownward } from '@material-ui/icons';
// import MarkdownPDF from "markdown-pdf";
import CloseIcon from '@material-ui/icons/Close';
import { pdf } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import { marked } from "marked";
import html2pdf from 'html2pdf.js';
import PdfTemplate from './ReadMePdf';
import styles from './ReadMe.style';
import CustomTheme from './ReadMe.theme.config';
import { createFileName } from '../utils';

export const downloadFile = async (title, content) => {
  const cossnt = await marked(content);
    console.log(cossnt);
    // const blob = await pdf((
    //   <PdfTemplate
    //     title={title}
    //     content={content}
    //   />
    // )).toBlob();
    // const fileName = createFileName('read_me', 'ICDC_Data_Model-');
    // saveAs(blob, `${fileName}.pdf`);
  };

  function pdfCallback(pdf) {
    const totalPages = pdf.internal.getNumberOfPages();
    const pageSz = pdf.internal.pageSize;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(5);
      pdf.setTextColor(0);
      pdf.text(pageSz.getWidth() - 1, pageSz.getHeight() - 0.5, `YOUR_TEXT ${i}`);
      pdf.text(pageSz.getWidth() - 8, pageSz.getHeight() - 0.5, `CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL`);
      pdf.addImage("YOUR_IMAGE", 'JPEG', pageSz.getWidth() - 1.1, pageSz.getHeight() - 0.25, 1, 0.2);
    }
}

  const downloadMarkdownPdf = async (title, content) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML += '<span>Understanding the ICDC Data Model</span>';
    wrapper.innerHTML += marked(content);
    
    console.log(wrapper);
    const opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // html2pdf(wrapper, {
    //   margin: 10,
    //   filename: "my.pdf",
    //   image: {type: 'jpeg', quality: 1},
    //   html2canvas: {dpi: 1000, letterRendering: true},
    //   jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
    //   pdfCallback: pdfCallback
    // })

    html2pdf()
      .set(opt)
      .from(wrapper)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        // pdf.addPage();
        const totalPages = pdf.internal.getNumberOfPages();
        const pageSz = pdf.internal.pageSize;
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(5);
          pdf.setTextColor(0);
          pdf.text(pageSz.getWidth() - 1.5, pageSz.getHeight() - 0.5, `YOUR_TEXT ${i}`);
          pdf.text(pageSz.getWidth() - 7.5, pageSz.getHeight() - 0.5, `CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL`);
          // pdf.addImage("YOUR_IMAGE", 'JPEG', pageSz.getWidth() - 1.1, pageSz.getHeight() - 0.25, 1, 0.2);
        }
    }).save();
}

const ReadMeDialogComponent = ({
  classes,
  display,
  displayReadMeDialog,
  content,
  title,
}) => {

  if(!content) {
    return (<></>)
  }

  return (
  <CustomTheme>
    <Dialog
      open={display}
      onClose={displayReadMeDialog}
      maxWidth="md"
      className={classes.dialogBox}
      BackdropProps={{
        timeout: 500,
      }}
      BackdropComponent={Backdrop}
    >
      <div className={classes.titleContent}>
        <div className={classes.title}>
          <span>
            {title}
          </span>
        </div>
        <div item xs={1} className={classes.closeBtn}>
          <Button
            className={classes.downloadBtn}
            startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow_all" />}
            onClick={() => downloadMarkdownPdf(title, content)}
          />
          <IconButton
            onClick={displayReadMeDialog}
          >
            <CloseIcon
              fontSize="small"
              className={classes.closeBtn}
            />
          </IconButton>
        </div>
      </div>
      <div
        className={classes.content}
        id="readMe_content"
      >
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </Dialog>
  </CustomTheme>
)};

export default withStyles(styles)(ReadMeDialogComponent);
