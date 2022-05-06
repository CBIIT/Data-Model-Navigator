import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  getPropertyNameFragment,
  getPropertyDescriptionFragment,
} from '../../../highlightHelper';
import ListComponent from './ListComponent';
import ButtonComponent from './ButtonComponent';
import KeyIconSvg from '../../../../assets/key_icon.svg';
import { controlVocabConfig as config } from '../../../bento/dataDictionaryData';

const TableRow = ({
    classes,
    propertyKeysList,
    requiredProperties,
    onlyShowMatchedProperties,
    matchedPropertiesSummary,
    preferredProperties,
    properties,
    needHighlightSearchResult,
    hideIsRequired,
    openBoxHandler,
}) => {
  const required = (requiredFlag, preferredFlag) => (
    <span className={requiredFlag ? classes.required : ''}>
      { requiredFlag ? 'Required' : preferredFlag ? 'Preferred' : 'Optional' }
    </span>
  );

  const displayKeyProperty = (property) => (
    <div className={classes.keyProperty}>
      <p>{property}</p>
      <img src={KeyIconSvg} className={classes.keyPropertyIcon} alt="key-icon" />
    </div>
  );

  const displayKeyPropsDescription = (description) => {
    const lines = description.split('<br>');
    return lines.map((line) => <span>{line}</span>);
  };
    
  return (
    <>
      {
        propertyKeysList.map((propertyKey) => {
          const property = properties[propertyKey];
          let nameMatch = null;
          let descriptionMatch = null;
          let typeMatchList = null;
          if (needHighlightSearchResult && matchedPropertiesSummary.length > 0) {
            const matchedSummaryItem = matchedPropertiesSummary
              .find((item) => item.propertyKey === propertyKey);
            if (matchedSummaryItem) {
              nameMatch = matchedSummaryItem.nameMatch;
              descriptionMatch = matchedSummaryItem.descriptionMatch;
              typeMatchList = matchedSummaryItem.typeMatchList;
            } else if (onlyShowMatchedProperties) {
              return null;
            }
          }
          let termID = '';
          let termLink = '';
          let type = '';
          let enums = '';
          let key = false;
          if ('src' in property) {
            try {
              termID = property.src;
              termLink = property.term.termDef && property.term.termDef.term_url;
            } catch (err) { }
          }
          const propertyNameFragment = getPropertyNameFragment(
            propertyKey,
            nameMatch,
            'data-dictionary-property-table__span',
          );
          if ('type' in property) {
            try {
              type = property.type;
            } catch (err) { }
          }
          if ('enum' in property) {
            enums = property.enum;
          }
          if ('key' in property) {
            key = property.key;
          }
    
          const propertyDescriptionFragment = getPropertyDescriptionFragment(
            property,
            descriptionMatch,
            'data-dictionary-property-table__span',
          );
          const isRequired = requiredProperties.includes(propertyKey);
          const isPreferred = preferredProperties.includes(propertyKey);
          return (
            <tr key={propertyKey} className={classes.row}>
              <td className={classes.rowItem}>
                { (key)
                  ? displayKeyProperty(propertyKey)
                  : propertyNameFragment }
              </td>
              <td className={classes.rowItem}>
                { (enums) ? (
                  <>
                    <span>
                      <p className={classes.acceptValue}>Acceptable Values:</p>
                      {' '}
                      {enums.length > config.maxNoOfItems
                        ? (<ListComponent items={enums.slice(0, config.maxNoOfItems)} />)
                        : (<ListComponent items={enums} />)}
                    </span>
                    {enums.length > config.maxNoOfItems
                      && (
                        <ButtonComponent
                          label="...show more"
                          openHandler={() => openBoxHandler(enums)}
                        />
                      )}
                  </>
                ) : (
                  <p>{JSON.stringify(type)}</p>
                )}
              </td>
              {
                (!hideIsRequired) && (
                  <td className={classes.rowItem}>
                    {required(isRequired, isPreferred)}
                  </td>
                )
              }
              <td className={classes.rowItem}>
                { (key)
                  ? (
                    <div className={classes.description}>
                      {displayKeyPropsDescription(property.description)}
                    </div>
                  )
                  : propertyDescriptionFragment }
              </td>
              <td className={classes.rowItem}>
                <p>{JSON.stringify(termID)}</p>
              </td>
            </tr>
          );
        })   
      }
    </>
  );
};

const styles = () => ({
  rowItem: {
    padding: '10px 10px 10px 19px',
    '& p': {
      margin: 'auto',
    },
    '&:nth-child(2) > p': {
      maxWidth: '300px',
      minWidth: '100px',
      wordWrap: 'break-word',
    },
  },
  row: {
    padding: '10px 10px 10px 19px',
    border: '0',
    textAlign: 'left',
    fontFamily: 'raleway',
    verticalAlign: 'top',
    '& p': {
      margin: 'auto',
    },
    '&:nth-child(2) > p': {
      maxWidth: '300px',
      minWidth: '100px',
      wordWrap: 'break-word',
    },
    '&:nth-child(odd)': {
      background: '#f4f5f5',
    },
    '&:nth-child(even)': {
      background: '#fff',
    },
  },
  required: {
    color: '#ff5a20',
    fontSize: '13px',
    fontWeight: '900',
  },
  keyProperty: {
    display: 'inline-block',
    minWidth: '220px',
    fontWeight: 'bold',
    color: '#0d71a3',
    '& p': {
      float: 'left',
      margin: 'auto',
    }
  },
  acceptValue: {
    margin: '0',
    minWidth: '130px',
  },
  keyPropertyIcon: {
    width: '25px',
    marginLeft: '8px',
    paddingTop: '5px', 
  },
  description: {
    '& span': {
      '&:last-child:not(:first-child)': {
        display: 'block',
        marginTop: '13px',
      },
    },
  },
});

export default withStyles(styles)(TableRow);
