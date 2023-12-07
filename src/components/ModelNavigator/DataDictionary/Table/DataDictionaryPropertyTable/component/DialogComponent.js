import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListComponent from './ListComponent';
import ButtonComponent from './ButtonComponent';
import DownloadFileTypeBtn from './DownloadFileTypeBtn';

const theme = {
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: '5px',
        padding: '0px 0px 0px 20px',
        boxShadow: 'none',
        overflowX: 'hidden',
        overflowY: 'hidden',
      },
      paperScrollPaper: {
        maxHeight: '575px',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '15px 25px 35px 15px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4a4a4a52',
      },
    },
    MuiIconButton: {
      root: {
        textTransform: 'none',
        padding: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#0d71a3',
      },
    },
  },
};

const DialogComponent = ({
  classes,
  display,
  closeHandler,
  items,
  maxNoOfItems,
  maxNoOfItemDlgBox,
  isSearchMode,
  typeMatchList,
  node,
  property,
}) => {
  const [open, setOpen] = useState(display);
  const [expand, setExpand] = useState(true);
  const [values, setValues] = useState([]);
  const [boxSize, setBoxSize] = useState('sm');
  useEffect(() => {
    setOpen(display);
    setValues(items);

    if (items && items.length > maxNoOfItemDlgBox) {
      // setValues(items.slice(0, maxNoOfItemDlgBox));
      setExpand(true);
    }
  }, [display, open]);

  const expandView = () => {
    if (items.length > maxNoOfItemDlgBox + maxNoOfItems) {
      setBoxSize('md');
    }
    setValues(items);
    setExpand(true);
  };

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <Dialog
        open={open}
        onClose={closeHandler}
        maxWidth={boxSize}
        BackdropProps={{
          timeout: 500,
        }}
        BackdropComponent={Backdrop}
      >
        <div className={classes.titleContent}>
          <div item xs={1} className={classes.closeBtn}>
            <DownloadFileTypeBtn
              data={items}
              node={node}
              propertyKey={property}
            />
            <IconButton
              onClick={closeHandler}
              aria-label="Close Dialog"
            >
              <CloseIcon
                fontSize="small"
              />
            </IconButton>
          </div>
          <div>
            <span className={classes.title}>
              Acceptable Values
            </span>
          </div>
        </div>
        <DialogContent>
          <ListComponent
            items={values}
            maxNoOfItems={maxNoOfItems}
            maxNoOfItemDlgBox={maxNoOfItemDlgBox}
            expand={expand}
            isSearchMode={isSearchMode}
            typeMatchList={typeMatchList}
          />
          <br />
          {(items.length > maxNoOfItemDlgBox && !expand) && (
            <ButtonComponent
              label="...show more"
              openHandler={expandView}
            />
          )}
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  titleContent: {
    width: '100%',
  },
  title: {
    paddingLeft: '20px',
    fontSize: '18px',
    marginTop: '20px',
    display: 'inherit',
    fontWeight: '600',
    color: '#0d71a3',
  },
  closeBtn: {
    width: '225px',
    padding: '20px',
    textAlign: 'right',
    float: 'right',
  },
});

DialogComponent.defaultProps = {
  maxNoOfItems: 30,
};

export default withStyles(styles)(DialogComponent);


