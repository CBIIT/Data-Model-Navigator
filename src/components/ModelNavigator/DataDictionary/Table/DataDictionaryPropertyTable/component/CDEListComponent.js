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

const linkPattern = /\b(?:https?|ftp):\/\/(?:www\.)?[^\s/$.?#].[^\s]*\b/;
function isLink(str) {
    return linkPattern.test(str);
}

const wrapLinkInLink = (inputString) => {
    const match = inputString.match(linkPattern); 3

    if (match) {
        const link = match[0];
        const linkIndex = inputString.indexOf(link);

        return (
            <>
                {inputString.substring(0, linkIndex)}
                <a href={`mailto:${link}`}>{link}</a>
                {inputString.substring(linkIndex + link.length)}
            </>
        );
    }

    return <>{inputString}</>;
};

const CDEListComponent = ({
    classes,
    items,
    maxNoOfItems,
    maxNoOfItemDlgBox,
    expand,
    CDEInfoMatchList,
    isSearchMode,
}) => {
    const highlightMatchingProperties = (item) => {
        console.log('check inHighlightMatchingProps', {item, CDEInfoMatchList});
        if (isSearchMode && CDEInfoMatchList && CDEInfoMatchList.length > 0) {
            const matchItem = CDEInfoMatchList.map((prop) => {
                if (prop.value === item) {
                    return prop;
                }
            }).filter((c) => c);
            if (matchItem.length) {
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

    console.log('check items', { items })
    return (
        <div style={{
            // paddingLeft: '380px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            {
                items.map(({ label, value }) => {
                    console.log(
                        "check label-value", { label, value }
                    )
                    return (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{
                            }}>{label}</div>
                            <div>{value.link
                                ? <a href={value.link}>{value.code}</a>
                                : highlightMatchingProperties(value)
                            }</div>
                        </div>
                    )
                })
            }
        </div>
    )
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

export default withStyles(styles)(CDEListComponent);
