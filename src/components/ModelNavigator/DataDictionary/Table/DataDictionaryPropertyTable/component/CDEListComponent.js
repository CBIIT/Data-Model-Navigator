import React from 'react';
import {
    ListItemText,
    withStyles,
    Typography,
} from '@material-ui/core';
import {
    addHighlightingSpans,
} from '../../../Utils/highlightHelper';

const CDEListComponent = ({
    classes,
    property,
    CDEInfoMatchList,
    isSearchMode,
}) => {
    const highlightMatchingProperties = (item, suffix = "") => {
        if (isSearchMode && CDEInfoMatchList && CDEInfoMatchList.length > 0) {
            const matchItem = CDEInfoMatchList.map((prop) => {
                if (prop.value === item) {
                    return prop;
                }
            }).filter((c) => c);
            if (matchItem.length) {
                return (
                    <Typography className={classes.listItemText}>
                        {item.substring}
                        {
                            addHighlightingSpans(
                                item,
                                matchItem[0].indices,
                                'data-dictionary-property-table__span',
                            )
                        }
                        {suffix}
                    </Typography>
                );
            }
        }
        return (
            <Typography className={classes.listItemText}>
                {item}
                {suffix}
            </Typography>
        );
    };

    /**
     * Generates a dictionary link based on the CDE origin, code, and version.
     * 
     * @param {string} origin 
     * @param {string} code 
     * @param {string} version 
     * @returns {string|null} Returns a URL if the origin is 'cadsr', otherwise returns null.
     */
    const getCDELink = (origin, code, version) => {
        if (origin?.toLowerCase()?.indexOf("cadsr") >= 0) {
            return `https://cadsr.cancer.gov/onedata/dmdirect/NIH/NCI/CO/CDEDD?filter=CDEDD.ITEM_ID=${code}%20and%20ver_nr=${version}`;
        }

        return null;
    };

    /**
     * Renders a CDE attribute with highlighting.
     * 
     * @param {any} value 
     * @param {number} index 
     * @returns {JSX.Element} Returns a span element with highlighted text.
     */
    const renderCDEAttribute = (value, index) => {
        return highlightMatchingProperties(value, index < allValues.length - 1 ? ', ' : '');
    };

    const allValues = property?.Term?.map((term) => term?.Value) || [];
    const allVersions = property?.Term?.map((term) => term?.Version) || [];
    const allCodes = property?.Term?.map((term) => {
        const codeLink = getCDELink(term?.Origin, term?.Code, term?.Version);
        return codeLink ? <a target='_blank' href={codeLink}>{term?.Code}</a> : term?.Code;
    }) || [];
    const allOrigins = property?.Term?.map((term) => term?.Origin) || [];

    return (
        <div className={classes.listWrapper}>
            {/* CDE Full Name */}
            {allValues.length > 0 && (
                <div className={classes.listItem}>
                    <div><strong>CDE Full Name</strong></div>
                    <div className={classes.listItemContainer}>
                        {allValues.map(renderCDEAttribute)}
                    </div>
                </div>
            )}
            {/* CDE Version */}
            {allVersions.length > 0 && (
                <div className={classes.listItem}>
                    <div><strong>Version</strong></div>
                    <div className={classes.listItemContainer}>
                        {allVersions.map(renderCDEAttribute)}
                    </div>
                </div>
            )}
            {/* CDE Code/Public ID */}
            {allCodes.length > 0 && (
                <div className={classes.listItem}>
                    <div><strong>Public ID</strong></div>
                    <div className={classes.listItemContainer}>
                        {allCodes.map(renderCDEAttribute)}
                    </div>
                </div>
            )}
            {/* CDE Origin */}
            {allOrigins.length > 0 && (
                <div className={classes.listItem}>
                    <div><strong>Origin</strong></div>
                    <div className={classes.listItemContainer}>
                        {allOrigins.map(renderCDEAttribute)}
                    </div>
                </div>
            )}
        </div>
    )
};

const styles = () => ({
    listItemContainer: {
        maxWidth: "280px",
    },
    listItemText: {
        fontWeight: '300',
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        display: 'inline',
    },
    listWrapper: {
        // paddingLeft: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
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
