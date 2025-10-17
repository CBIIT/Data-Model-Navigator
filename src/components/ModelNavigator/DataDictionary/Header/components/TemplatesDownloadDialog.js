import React, { useEffect, useMemo, useState } from "react";
import CustomDialog from "../../../../CustomDialog";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  withStyles,
  Grid,
} from "@material-ui/core";
import styles from "./TemplatesDownloadDialog.styles";
import checkboxCheckedSrc from "../../../../../assets/icons/checkbox_checked.svg";
import checkboxUncheckedSrc from "../../../../../assets/icons/checkbox_unchecked.svg";

const TemplatesDownloadDialog = ({
  classes,
  open,
  onClose,
  onConfirm,
  entries = [],
  defaultSelectAll = false,
}) => {
  const [selected, setSelected] = useState({});
  const keys = useMemo(() => entries.map(([k]) => k), [entries]);
  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );
  const allChecked = keys.length > 0 && selectedCount === keys.length;
  const indeterminate = selectedCount > 0 && selectedCount < keys.length;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!defaultSelectAll) {
      setSelected({});
      return;
    }

    toggleAll(true);
  }, [open, defaultSelectAll, keys]);

  const toggleAll = (checked) => {
    if (!checked) {
      setSelected({});
      return;
    }

    const all = {};
    keys.forEach((k) => {
      all[k] = true;
    });
    setSelected(all);
  };

  const toggleOne = (k) => {
    setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const handleConfirm = () => {
    const chosen = keys.filter((k) => selected[k]);
    onConfirm?.(chosen);
  };

  const description = (
    <>
      <Box sx={{ mb: 2 }}>
        Select the data types you'd like to include in your submission template
        download.
      </Box>

      <FormControlLabel
        className={classes.formControlLabel}
        label="Select all"
        control={
          <Checkbox
            color="primary"
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={(e) => toggleAll(e.target.checked)}
            icon={
              <img
                className={classes.checkboxIcon}
                src={checkboxUncheckedSrc}
                alt="Unchecked checkbox"
                width={24}
                height={24}
              />
            }
            checkedIcon={
              <img
                className={classes.checkboxIcon}
                src={checkboxCheckedSrc}
                alt="Checked checkbox"
                width={24}
                height={24}
              />
            }
          />
        }
      />

      <Divider className={classes.divider} />

      <Box>
        <Grid
          container
          alignItems="flex-start"
          className={classes.checkboxGrid}
        >
          {keys?.map((k) => (
            <Grid item key={k} xs={12} sm={6} md={4}>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    color="primary"
                    checked={!!selected[k]}
                    onChange={() => toggleOne(k)}
                    icon={
                      <img
                        className={classes.checkboxIcon}
                        src={checkboxUncheckedSrc}
                        alt="Unchecked checkbox"
                        width={24}
                        height={24}
                      />
                    }
                    checkedIcon={
                      <img
                        className={classes.checkboxIcon}
                        src={checkboxCheckedSrc}
                        alt="Checked checkbox"
                        width={24}
                        height={24}
                      />
                    }
                  />
                }
                label={k}
                title={k}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Submission Templates"
      subtitle="Data Model Navigator Downloads"
      description={description}
      closeText="Cancel"
      confirmText="Download"
      confirmButtonProps={{ disabled: selectedCount === 0 }}
      classesOverride={{
        actionsRow: classes.actionsRow,
        confirmBtn: classes.actionBtn,
        closeBtn: classes.actionBtn,
        dialogPaper: classes.dialogPaper,
      }}
    />
  );
};

export default withStyles(styles)(TemplatesDownloadDialog);

