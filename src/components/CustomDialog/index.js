import React from "react";
import CloseIconSvg from "../../assets/icons/close_icon.svg";
import styles from "./CustomDialog.style";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";

const CustomDialog = ({
  classes,
  subtitle = "",
  header = "",
  subtitleProps = {},
  headerProps = {},
  description,
  closeText = "Cancel",
  closeButtonProps = {},
  onClose,
  confirmText = "Submit",
  confirmButtonProps = {},
  onConfirm,
  open,
  classesOverride = {},
  ...rest
}) => {
  const mergedClasses = React.useMemo(
    () => ({ ...classes, ...classesOverride }),
    [classes, classesOverride]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title=""
      data-testid="dialog"
      classes={{
        paper: mergedClasses.dialogPaper,
      }}
      scroll="body"
      {...rest}
    >
      <IconButton
        onClick={onClose}
        aria-label="close"
        data-testid="dialog-close-icon-button"
        className={mergedClasses.closeIconBtn}
      >
        <img src={CloseIconSvg} alt="Close dialog" />
      </IconButton>

      <Typography
        variant="subtitle1"
        data-testid="dialog-subtitle"
        className={mergedClasses.subtitle}
        {...subtitleProps}
      >
        {subtitle}
      </Typography>

      <Typography
        variant="h3"
        data-testid="dialog-header"
        className={mergedClasses.header}
        {...headerProps}
      >
        {header}
      </Typography>

      <div
        data-testid="dialog-description"
        className={mergedClasses.description}
      >
        {description}
      </div>

      <div className={mergedClasses.actionsRow}>
        <Button
          id="dialog-close-button"
          variant="contained"
          color="info"
          onClick={onClose}
          aria-label="Cancel button"
          data-testid="dialog-cancel-button"
          className={`${mergedClasses.btn} ${mergedClasses.closeBtn}`}
          {...closeButtonProps}
        >
          {closeText}
        </Button>
        <Button
          id="dialog-confirm-button"
          variant="contained"
          color="primary"
          onClick={onConfirm}
          aria-label="Confirm to Remove button"
          data-testid="dialog-confirm-button"
          className={`${mergedClasses.btn} ${mergedClasses.confirmBtn}`}
          {...confirmButtonProps}
        >
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
};

export default withStyles(styles)(CustomDialog);

