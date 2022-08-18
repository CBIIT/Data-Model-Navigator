import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '195px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
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
    console.log(event);
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const [label, setLabel] = useState('DOWNLOADS');

  const setFileType = (event) => {
    console.log(event);
  }

  return (
    <div>
      <Button
        aria-controls="mui-menu"
        variant="outlined"
        onClick={clickHandler}
        className={classes.studyDisplayBtn}
      >
        <div className={classes.icon}>
        </div>
        <div className={classes.dropDownText}>
          {label}
        </div>
        <ArrowDropDownIcon className={classes.arrowDropDown} />
      </Button>
      <MuiMenu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClick={setFileType}
      >
        <MuiMenuItem className={classes.menuItem} value="JSON">
          JSON
        </MuiMenuItem>
        <MuiMenuItem className={classes.menuItem} value="TSV">
          TSV
        </MuiMenuItem>
      </MuiMenu>
    </div>
  );
};

const styles = () => ({
  studyDisplayBtn: {
    width: '195px',
    height: '40px',
    padding: '4px 14px 2px 12px',
    boxSizing: 'border-box',
    border: '2.5px solid #C2C2C2',
    backgroundColor: '#F2F3F3',
    textTransform: 'none',
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
  arrowDropDown: {
    fontSize: '30px',
    color: '#DC762F',
  },
  cartIcon: {
    height: '28px',
    width: '28px',
    margin: '0px 3px 0px 2px',
  },
  cartCounter: {
    position: 'relative',
    top: '-3px',
    right: '7px',
  },
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
    bottom: '3px',
  },
  noOfStudies: {
    position: 'absolute',
    top: '2px',
    left: '28px',
    border: '1px solid #708090',
    borderRadius: '18px',
    backgroundColor: '#ffffff',
    width: '18px',
    height: '18px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#000001',
  },
  menuItem: {
    color: '#DC762F',
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: '55px',
  },
  link: {
    marginLeft: '5px',
    color: '#DC762F',
    fontSize: '12px',
    fontWeight: '700',
    verticalAlign: 'bottom',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dashboarLink: {
    paddingLeft: '50px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
});

export default withStyles(styles, { withTheme: true })(DownloadButton);
