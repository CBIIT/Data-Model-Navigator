import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  Typography,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import {
  addHighlightingSpans,
} from '../../../Utils/highlightHelper';

const twoColumnsView = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '0px',
      },
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 2,
        MozColumns: 2,
        columns: 2,
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-9px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      gutters: {
        paddingLeft: '2px',
        marginBottom: '1px',
      },
    },
  },
};

const threeColumnsView = {
  overrides: {
    MuiList: {
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 3,
        MozColumns: 3,
        columns: 3,
      },
      padding: {
        paddingTop: '0px',
        marginTop: '-10px',
      },
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        display: 'initial',
        paddingTop: '4px',
        minWidth: '10px',
        color: '#00002dd9',
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      MuiListItemText: {
        root: {
          padding: '4px',
          marginTop: '-2px',
          marginBottom: '3px',
        },
      },
      gutters: {
        margin: 'auto',
        marginBottom: '-10px',
        paddingLeft: '0px',
      },
    },
  },
};

const theme = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '2px',
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      gutters: {
        paddingLeft: '0',
      },
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        paddingTop: '11px',
        minWidth: '10px',
        color: '#00002dd9',
      },
    },
    MuiListItemText: {
      root: {
        padding: '4px',
        marginTop: '0px',
        marginBottom: '0px',
      },
    },
  },
};

function containsEmail(str) {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    return emailPattern.test(str);
  }

  const wrapEmailInLink = (inputString) => {
    // Regular expression to match an email pattern
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  
    // Check if the string contains an email
    const match = inputString.match(emailRegex);
  
    if (match) {
      const email = match[0];
      // Find the index of the email in the string
      const emailIndex = inputString.indexOf(email);
      
      // Surround the email with the link and return the JSX with the other parts of the string
      return (
        <>
          {inputString.substring(0, emailIndex)}
          <a href={`mailto:${email}`}>{email}</a>
          {inputString.substring(emailIndex + email.length)}
        </>
      );
    }
  
    // Return the original string if no email found
    return <>{inputString}</>;
  };
  
  

const ListComponent = ({
  classes,
  items,
  maxNoOfItems,
  maxNoOfItemDlgBox,
  expand,
  typeMatchList,
  isSearchMode,
}) => {
  // const meanIndex = (length) => ((length % 2) ? length / 2 - 0.5 : length / 2);
  const customTheme = (expand && items.length > maxNoOfItemDlgBox + maxNoOfItems)
    ? { overrides: { ...theme.overrides, ...threeColumnsView.overrides } }
    : (items.length > maxNoOfItems)
      ? { overrides: { ...theme.overrides, ...twoColumnsView.overrides } } : theme;

  const highlightMatchingProperties = (item) => {
    if (isSearchMode && typeMatchList && typeMatchList.length > 0) {
      const matchItem = typeMatchList.map((prop) => {
        if (prop.value === item) {
          return prop;
        }
      }).filter((c) => c);
      if (matchItem.length == 1) {
        return (
          <ListItemText>
            <span className={classes.listItemText}>
              {item.substring}
              {
              addHighlightingSpans(
                item,
                matchItem[0].indices,
                'data-dictionary-property-table__span',
              )
            }
            </span>
          </ListItemText>
        );
      }
    }
    return (
      <ListItemText
        primary={(
          <Typography className={classes.listItemText}>
            {item}
          </Typography>
        )}
      />
    );
  };

  return (
    <MuiThemeProvider theme={createTheme(customTheme)}>
      <List>
        {items.map((item, index) => {
            let payload;
            if (containsEmail(item)) {

            }
            return (
                <>
                  <ListItem key={`${index}`}>
                    <ListItemIcon>
                      <FiberManualRecord style={{ fontSize: 8 }} />
                    </ListItemIcon>
                    {!containsEmail(item) ? highlightMatchingProperties(item) : <ListItemText primary={(
                        <Typography className={classes.listItemText}>
                            {wrapEmailInLink(item)}
                        </Typography>
                    )}/>}
                  </ListItem>
                </>
              )
        })}
      </List>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  listItemText: {
    fontWeight: '300',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
  },
  longText: {
    fontSize: '13px',
    fontWeight: '300',
    marginBottom: '4px',
    lineHeight: '1.3',
    '@media not all and (min-resolution:.001dpcm)': {
      lineHeight: '1',
    },
  },
  listIcon: {
    float: 'left',
    paddingTop: '-5px',
    height: '20px',
    marginTop: '-35px',
  },
  label: {
    paddingLeft: '15px',
    display: 'block',
    fontSize: '14px',
    fontWeight: 300,
    '@media not all and (min-resolution:.001dpcm)': {
      marginBottom: '0px',
    },
  },
  highLightText: {
    color: 'var(--g3-color__highlight-orange)',
    fontWeight: '600',
  },
});

export default withStyles(styles)(ListComponent);
