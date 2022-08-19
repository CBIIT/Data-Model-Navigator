import React, { useState } from 'react';
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {ArrowDownward, ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import { Box } from '@material-ui/core';

const fileTypes = ['JSON', 'TSV'];

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #3283c8',
    width: '125px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
    marginTop: '0px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const MuiMenuItem = withStyles(() => ({
  root: {
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root': {
        backgroundColor: 'none',
      },
    },
  },
}))(MenuItem);

const theme = {
  overrides: {
    MuiButton: {
      root: {
        minWidth: '10px',
      },
      startIcon: {
        marginRight: '0px',
      },
      label: {
        justifyContent: 'left',
      },
      outlined: {
        border: 'none',
      }
    },
  },
};

const DownloadButton = ({
  classes,
  data,
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [label, setLabel] = useState('DOWNLOADS');

  const clickHandler = (event) => {
    setLabel('DOWNLOADS');
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const setFileType = (value) => {  
    setLabel(value);
    setAnchorElement(null);
  }

  const downladFileHandler = () => {
    console.log('download file ' + label);
  }

  const MenuItem = (type) => (
    <MuiMenuItem className={classes.menuItem} onClick={() => setFileType(type)}>
      {type}
    </MuiMenuItem>
  );
  
  const options = fileTypes.map((item) => MenuItem(item));

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <Box className={classes.menu}>
        <Button
          className={classes.downloadBtn}
          startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow" />}
          onClick={downladFileHandler}
        />
        <Button
          aria-controls="mui-menu"
          variant="outlined"
          onClick={clickHandler}
          className={classes.displayBtn}
          startIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        >
          <div className={classes.dropDownText}>
            {label}
          </div>
        </Button>
        <MuiMenu
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={closeHandler}
        >
          {options}
        </MuiMenu>
      </Box>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  menu: {
    width: "160px",
    height: '40px',
    border: '2.5px solid #3283c8',
    boxSizing: 'border-box',
    backgroundColor: '#C1C1C1',
    borderRadius: '5px',
  },
  displayBtn: {
    width: '125px',
    height: '35px',
    boxSizing: 'border-box',
    // border: '2.5px solid #C2C2C2',
    backgroundColor: '#F2F3F3',
    textTransform: 'none',
    padding: '7px',
    marginRight: '0',
    float: 'left',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dropDownText: {
    lineHeight: '1.05',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#525252',
    textAlign: 'left',
    position: 'relative',
  },
  arrowDownward: {
    fontSize: '30px',
    color: '#DC762F',
  },
  menuItem: {
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: '25px',
  },
  downloadBtn: {
    float: 'right',
    marginBottom: '-20px',
    height: '36px',
    width: '30px',
    backgroundColor: '#3283c8',
    borderRadius: '0px',
  },
  downloadIcon: {
    color: '#fff',
  },
  expandIcon: {

  },
});

export default withStyles(styles, { withTheme: true })(DownloadButton);
