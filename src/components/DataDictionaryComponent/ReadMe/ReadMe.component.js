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

const downloadMarkdownPdf = async (title, content) => {
  // const MdPdf = markDwnContent(content);
  // downloadFile(title, content)
  // console.log(cont);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = marked(content);
  
  console.log(wrapper);
  const page = document.getElementById('readMe_content');
  // page.innerHTML = marked(content);
  console.log(page)
  // await html2PDF(page, {
  //   jsPDF: {
  //     format: 'a4',
  //   },
  //   imageType: 'image/jpeg',
  //   output: './pdf/generate.pdf'
  // });
  const element = document.getElementById('readMe_content');
  const opt = {
    margin:       1,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  // New Promise-based usage:
  // html2pdf().set(opt).from(element).save();
  html2pdf().set(opt).from(wrapper).toPdf().get('pdf').then(function (pdf) {
    pdf.addPage();
  }).toPdf().save();
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
