import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {ArrowDownward, ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import { Box } from '@material-ui/core';

const fileTypes = ['JSON', 'TSV'];

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '151px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
    marginTop: '5px',
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

const DownloadButton = ({
  classes,
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const clickHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const [label, setLabel] = useState('DOWNLOADS');

  const setFileType = (value) => {
    console.log(value);
    setLabel(value);
  }

  const MenuItem = (type) => (
    <MuiMenuItem className={classes.menuItem} onClick={() => setFileType(type)}>
      {type}
    </MuiMenuItem>
  );
  
  const options = fileTypes.map((item) => MenuItem(item));

  return (
    <Box width="215px">
      <Button
        className={classes.downloadBtn}
        startIcon={<ArrowDownward />}  
      /> 
      <Button
        aria-controls="mui-menu"
        variant="outlined"
        onClick={clickHandler}
        className={classes.displayBtn}
        startIcon={<ExpandMoreIcon />}
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
  );
};

const styles = () => ({
  displayBtn: {
    width: '155px',
    height: '40px',
    boxSizing: 'border-box',
    border: '2.5px solid #C2C2C2',
    backgroundColor: '#F2F3F3',
    textTransform: 'none',
    padding: '0',
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
    color: '#DC762F',
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: '55px',
  },
  downloadBtn: {
    float: 'right',
    marginBottom: '-10px'
  }
});

export default withStyles(styles, { withTheme: true })(DownloadButton);
