import React from "react";
import {
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  Button,
} from "@material-ui/core";
// import { saveAs } from 'file-saver';
import { ArrowDownward } from "@material-ui/icons";
// import MarkdownPDF from "markdown-pdf";
import CloseIcon from "@material-ui/icons/Close";
// import { pdf } from '@react-pdf/renderer';
import ReactMarkdown from "react-markdown";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
// import PdfTemplate from './ReadMePdf';
import styles from "./ReadMe.style";
import CustomTheme from "./ReadMe.theme.config";
import { createFileName } from "../utils";
import footerLine from "./assets/two-pixel-footer-line.png";
import nihLogo from "./assets/icdc_nih_logo.png";
import PdfDownloadIcon from "../Header/icons/icon_download_PDF.svg";

const date = new Date().toLocaleString("en-us", {
  month: "long",
  year: "numeric",
  day: "numeric",
}).toUpperCase();

/** download pdf of marked down file
 * 1.convert or generate html element of marked object
 * 2. uses html2pdf library to convert html to pdf
 * all the html style from marked down file will be reflected on PDF
 */
export const downloadMarkdownPdf = async (title, content) => {
  /** create html elment for pdf - convert marked object to html */
  const readMeContent = document.createElement("div");
  const body = document.createElement("div");
  /** add header logo on first page */
  const headerLogo = `<img src='${nihLogo}' width="50%" alt='logo' />
  <br> <div style="height:1px; background-color: #173554;"/>`;
  readMeContent.innerHTML += headerLogo;
  const titleEl =
    "<br><span style='color: #4D6787; font-size: 18px; font-family: Lato Bold'>".concat(
      title,
      "</span>"
    );
  readMeContent.innerHTML += titleEl;
  body.innerHTML += `<div style="padding-left: 15px">${marked(content)}</div>`;
  readMeContent.innerHTML += body.innerHTML;

  /** set pdf fileneam */
  const fileName = createFileName("read_me", "ICDC_Data_Model-");
  /** configure pdf increase pixel of the PDF */
  const options = {
    margin: [0.5, 0.5, 0.8, 0.5],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      dpi: 192,
      scale: 4,
      letterRendering: true,
      useCORS: true,
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  html2pdf()
    .set(options)
    .from(readMeContent)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageSz = pdf.internal.pageSize;
      const pgHeight = pageSz.getHeight();
      const pgWidth = pageSz.getWidth();

      /** set header and footer content for each pdf page
       * page height and width is used for assigning header and footer element
       * adjust height & width for footer
       * adjust height & width for header
       */
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFont('Nunito Sans Regular');
        pdf.setFontSize(7)
        pdf.text(pgWidth - 1.4, pgHeight - 0.5, `${date} | ${i}`);
        pdf.text(
          pgWidth - 8,
          pgHeight - 0.5,
          "CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL"
        );
        pdf.addImage(
          footerLine,
          "JPEG",
          pgWidth - 8,
          pgHeight - 0.75,
          7.5,
          0.05
        );
        // if (i === 1) {
        // pdf.addImage(nihLogo, 'JPEG', pgWidth - 7.75, pgHeight - 10.75, 4, 0.5);
        // pdf.addImage(footerLine, 'JPEG', pgWidth - 7.75, pgHeight - 10.15, 7, 0.05);
        // }
      }
    })
    .save();
};

const ReadMeDialogComponent = ({
  classes,
  display,
  displayReadMeDialog,
  content,
  title,
}) => {
  if (!content) {
    return <></>;
  }

  return (
    <CustomTheme>
      <Dialog
        classes={{
          paper: classes.dialogPaper,
        }}
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
            <span>{title}</span>
          </div>
          <div item xs={1} className={classes.closeBtn}>
            <Button
              className={classes.downloadBtn}
              onClick={() => downloadMarkdownPdf(title, content)}
            >
              <img
                src={PdfDownloadIcon}
                alt="pdf download icon"
                className={classes.downloadIcon}
              />
            </Button>
            <IconButton onClick={displayReadMeDialog}>
              <CloseIcon fontSize="small" className={classes.closeBtnIcon} />
            </IconButton>
          </div>
        </div>
        <div className={classes.content} id="readMe_content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Dialog>
    </CustomTheme>
  );
};

export default withStyles(styles)(ReadMeDialogComponent);
