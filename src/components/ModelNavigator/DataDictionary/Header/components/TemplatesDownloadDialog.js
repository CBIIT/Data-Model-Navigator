import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { calculateTextWidth } from "../../utils";

const TemplatesDownloadDialog = ({
  classes,
  open,
  onClose,
  onConfirm,
  entries = [],
  defaultSelectAll = false,
}) => {
  const [selected, setSelected] = useState({});
  const [checkboxOverflowMap, setCheckboxOverflowMap] = useState(new Map());
  const gridRef = useRef(null);

  /**
   * Extract data types from entries and sort them
   */
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

    Object.keys(parentMap).forEach((node) => {
      cache[node] = getAllAncestors(node);
    });

    return cache;
  }, [parentMap]);

  /**
   * Get the count of currently selected data types
   */
  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );

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

  useEffect(() => {
    if (!open || !dataTypes?.length || !gridRef.current?.children?.length) {
      return;
    }

    const checkboxes =
      gridRef.current.getElementsByClassName("data-type-checkbox");
    if (!checkboxes?.length) {
      return;
    }

    const checkForOverflows = () => {
      const values = new Map();

      dataTypes.forEach((dataType, index) => {
        const labelWidth = checkboxes[index]?.parentNode?.clientWidth || 0;
        const textWidth =
          calculateTextWidth(dataType, "Nunito", "16px", "400") || 0;

        values.set(dataType, textWidth < labelWidth);
      });

      setCheckboxOverflowMap(values);
    };

    // To avoid excessive re-calculating, overflows are only checked once per grid render
    checkForOverflows();
  }, [gridRef.current]);

  const onSelectAll = () => {
    if (!dataTypes?.length) {
      return;
    }

    const all = {};
    dataTypes.forEach((dataType) => {
      all[dataType] = true;
    });
    setSelected(all);
  };

  const onDeselectAll = () => {
    if (!dataTypes?.length) {
      return;
    }

    setSelected({});
  };

  const toggleOne = (dataType) => {
    setSelected((prev) => {
      const isCurrentlySelected = !!prev[dataType];
      const next = { ...prev, [dataType]: !isCurrentlySelected };

      // If selecting this node, also select all its ancestors
      if (!isCurrentlySelected) {
        (ancestorMap[dataType] || parentMap[dataType] || []).forEach(
          (parentId) => {
            next[parentId] = true;
          }
        );
      }

      return next;
    });
  };

  const handleConfirm = () => {
    const chosen = dataTypes.filter((dataType) => selected[dataType]);
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
          ref={gridRef}
          className={classes.checkboxGrid}
        >
          {dataTypes?.map((dataType) => (
            <Grid item key={dataType} xs={12} sm={6}>
              <Tooltip
                classes={{ tooltip: classes.checkboxTooltip }}
                title={dataType}
                placement="top"
                arrow
                disableHoverListener={checkboxOverflowMap.get(dataType)}
              >
                <FormControlLabel
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      color="primary"
                      checked={!!selected[dataType]}
                      onChange={() => toggleOne(dataType)}
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
                    <span
                      className={`${classes.checkboxLabel} data-type-checkbox`}
                    >
                      {dataType}
                    </span>
                  }
                />
              </Tooltip>
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

