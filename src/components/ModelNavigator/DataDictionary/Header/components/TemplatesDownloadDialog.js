import React, { useEffect, useMemo, useState } from "react";
import CustomDialog from "../../CustomDialog/CustomDialog.component";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  withStyles,
  Grid,
  Tooltip,
  Button,
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
  const dataTypes = useMemo(
    () =>
      entries
        .map(([k]) => k)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
    [entries]
  );

  /**
   * Build a map of each node to its direct parents
   */
  const parentMap = useMemo(() => {
    const map = {};
    entries.forEach(([id]) => {
      map[id] = [];
    });

    entries.forEach(([_id, value]) => {
      (value?.links || []).forEach((l) => {
        if (l?.Src && l?.Dst) {
          const parent = l.Dst;
          const child = l.Src;
          if (map[child] && !map[child].includes(parent)) {
            map[child].push(parent);
          }
        }
      });
    });

    return map;
  }, [entries]);

  /**
   * Build a map of each node to all its ancestors (direct and indirect)
   */
  const ancestorMap = useMemo(() => {
    const cache = {};
    const getAllAncestors = (node, seen = new Set()) => {
      if (seen.has(node)) {
        return [];
      }

      seen.add(node);
      const directParents = parentMap[node] || [];
      const indirectAncestors = directParents.flatMap((p) =>
        getAllAncestors(p, seen)
      );

      return [...new Set([...directParents, ...indirectAncestors])];
    };

    Object.keys(parentMap).forEach((k) => {
      cache[k] = getAllAncestors(k);
    });

    return cache;
  }, [parentMap]);

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );

  const allChecked = dataTypes.length > 0 && selectedCount === dataTypes.length;
  const allUnchecked = dataTypes.length > 0 && selectedCount === 0;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!defaultSelectAll) {
      setSelected({});
      return;
    }

    onSelectAll();
  }, [open, defaultSelectAll, dataTypes]);

  const onSelectAll = () => {
    const all = {};
    dataTypes.forEach((k) => {
      all[k] = true;
    });
    setSelected(all);
  };

  const onDeselectAll = () => {
    setSelected({});
  };

  const toggleOne = (k) => {
    setSelected((prev) => {
      const isCurrentlySelected = !!prev[k];
      const next = { ...prev, [k]: !isCurrentlySelected };

      // If selecting this node, also select all its ancestors
      if (!isCurrentlySelected) {
        (ancestorMap[k] || parentMap[k] || []).forEach((parentId) => {
          next[parentId] = true;
        });
      }

      return next;
    });
  };

  const handleConfirm = () => {
    const chosen = dataTypes.filter((k) => selected[k]);
    onConfirm?.(chosen);
  };

  const description = (
    <>
      <Box className={classes.description}>
        Select the data types you'd like to include in your submission template
        download.
      </Box>

      <Divider className={classes.divider} />

      <Box className={classes.toggleButtonsRow}>
        <Button
          id="dialog-select-all-button"
          variant="contained"
          color="primary"
          onClick={onSelectAll}
          disabled={allChecked}
          aria-label="Select all button"
          data-testid="dialog-select-all-button"
          className={classes.toggleButton}
        >
          Select All
        </Button>
        <Button
          id="dialog-deselect-all-button"
          variant="contained"
          color="primary"
          onClick={onDeselectAll}
          disabled={allUnchecked}
          aria-label="Deselect all button"
          data-testid="dialog-deselect-all-button"
          className={classes.toggleButton}
        >
          Deselect All
        </Button>
      </Box>

      <Box className={classes.checkboxGridWrapper}>
        <Grid
          container
          alignItems="flex-start"
          className={classes.checkboxGrid}
        >
          {dataTypes?.map((k) => (
            <Grid item key={k} xs={12} sm={6}>
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
                label={
                  <Tooltip
                    classes={{ tooltip: classes.checkboxTooltip }}
                    title={k}
                    placement="top"
                    arrow
                  >
                    <span className={classes.checkboxLabel}>{k}</span>
                  </Tooltip>
                }
                title={k}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider className={classes.bottomDivider} />
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
      scroll="paper"
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

