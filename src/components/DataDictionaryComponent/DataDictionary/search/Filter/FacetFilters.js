/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles,
  Divider,
  Backdrop,
  CircularProgress,
  Icon,
  Button,
} from '@material-ui/core';
import _ from 'lodash';
import {
  ArrowDropDown as ArrowDropDownIcon, ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortLabels,
  resetIcon,
  defaultFacetSectionVariables,
} from '../../bento/dataDictionaryData';
import CheckBoxView from './CheckBoxView';
import styles from './FacetFilters.style';
import FacetFilterThemeProvider from './FacetFilterThemeConfig';

const CustomAccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    // marginLeft: 35,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

const FacetFilters = ({
  classes,
  onClearAllFilter,
  onToggleCheckBox,
  hidePropertyTable,
  onClickBlankSpace,
  onResetGraphCanvas,
  onSortSection,
  onClearGroupFilter,
}) => {
  const activeFilters = useSelector((state) => (
    state.submission
          && state.submission.allActiveFilters
      ? state.submission.allActiveFilters : {}));
  const activeFiltersCount = Object.entries(activeFilters).reduce(
    (acc, [key, val]) => acc + (val.length), 0, // eslint-disable-line no-unused-vars
  );

  const sortByForGroups = useSelector((state) => (
    state.submission
      && state.submission.sortByList
      ? state.submission.sortByList : {}));

  const facetSectionVariables = useSelector((state) => (
    state.submission
          && state.submission.facetfilterConfig
      ? state.submission.facetfilterConfig.facetSectionVariables : {}));

  const sideBarContent = useSelector((state) => (
    state.submission
    && state.submission.checkbox
  ? state.submission.checkbox : {
    data: [],
    defaultPanel: false,
  }));

  const showCheckboxCount = useSelector((state) => (
    state.submission
          && state.submission.facetfilterConfig
      ? state.submission.facetfilterConfig.showCheckboxCount : 3));

  const [groupsExpanded, setGroupsExpanded] = React.useState([]);
  const [sectionExpanded, setSectionExpanded] = React.useState(
    Object.keys(facetSectionVariables).reduce((acc, filterKey) => {
      const { isExpanded } = facetSectionVariables[filterKey];
      if (isExpanded) {
        acc.push(filterKey);
      }
      return acc;
    }, []),
  );

  function getSortButtonColor(sideBarItem, sortType) {
    return (sortByForGroups[sideBarItem.datafield] === sortType
      ? '#B2C6D6' : '#4A4A4A');
  }

  const handleGroupsChange = (panel) => (event, isExpanded) => {
    const groups = _.cloneDeep(groupsExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }
    setGroupsExpanded(groups);
    // set height of filters.
  };

  const getGroupNameColor = (sideBarItem, currentSection) => {
    let groupNameColor = 'black';
    sideBarItem.checkboxItems.map(
      (item) => {
        if (item.isChecked) {
          groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
        }
        return '';
      },
    );
    return groupNameColor;
  };
  
  function getCheckBoxColor(index, currentSection) {
    return index % 2 ? facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
      : facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
  }

  const handleSectionChange = (panel) => (event, isExpanded) => {
    const sections = _.cloneDeep(sectionExpanded);
    if (isExpanded) {
      sections.push(panel);
    } else {
      const index = sections.indexOf(panel);
      if (index > -1) {
        sections.splice(index, 1);
      }
    }
    setSectionExpanded(sections);
  };

  const handleToggle = (item) => () => {
    const toggleCheckBoxItem = {
      groupName: item.groupName,
      section: item.section,
      name: item.name,
      datafield: item.datafield,
      isChecked: !item.isChecked,
    }
    onClickBlankSpace();
    hidePropertyTable();
    onToggleCheckBox(toggleCheckBoxItem);
  };

  const getCheckBoxView = (sideBarItem, currentSection) => {
    const showItems = sideBarItem.checkboxItems.filter((item) => item !== undefined
    && item.subjects > 0);
    return showItems.map(
      (item, index) => (
        <CheckBoxView
          key={index}
          checkboxItem={item}
          sideBarItem={sideBarItem}
          currentSection={currentSection}
          handleToggle={handleToggle}
          facetSectionVariables={facetSectionVariables}
          defaultFacetSectionVariables={defaultFacetSectionVariables}
          backgroundColor={getCheckBoxColor(index, currentSection)}
          checkColor={getGroupNameColor(sideBarItem, currentSection)}
          dataDictionary
        />
      ),
    );
  };

  const showSelectedChecbox = (sideBarItem, currentSection) => {
    const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked
      && item.subjects > 0)).map((item) => (
      {
        ...item,
      }
    ));
    const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
      .map((item, index) => (
        <CheckBoxView
          checkboxItem={item}
          sideBarItem={sideBarItem}
          currentSection={currentSection}
          handleToggle={handleToggle}
          facetSectionVariables={facetSectionVariables}
          defaultFacetSectionVariables={defaultFacetSectionVariables}
          backgroundColor={getCheckBoxColor(index, currentSection)}
          checkColor={getGroupNameColor(sideBarItem, currentSection)}
          dataDictionary
        />
      ));

    return (
      <div>
        {selectedCheckbox}
      </div>
    );
  };

  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true);

  const arrangeBySections = (arr) => {
    const sideBar = {};
    arr.forEach(({ section, ...item }) => {
      if (!sideBar[section]) {
        sideBar[section] = { sectionName: section, items: [] };
      }
      sideBar[section].items.push({ section, ...item });
    });
    return Object.values(sideBar);
  };

  const sideBarSections = arrangeBySections(sideBarDisplay);

  if (facetSectionVariables
      && Object.keys(facetSectionVariables).length === 0) {
    return (<></>)
  }

  const clearFilterHandler = () => {
    onClearAllFilter();
    onClickBlankSpace();
    hidePropertyTable();
  }

  return (
    <>
      <Button
        id="button_sidebar_clear_all_filters"
        variant="outlined"
        disabled={activeFiltersCount === 0}
        className={classes.customButton}
        classes={{ root: classes.clearAllButtonRoot }}
        onClick={clearFilterHandler}
        disableRipple
      >
        CLEAR ALL
      </Button>
      {
    sideBarSections.map((currentSection) => (
      <FacetFilterThemeProvider>
        <Divider
          variant="middle"
          style={{
            backgroundColor: facetSectionVariables[currentSection.sectionName]
              ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : '#000000',
            margin: '0px',
            height: facetSectionVariables[currentSection.sectionName]
              ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : '' : '5px',
          }}
        />
        <Accordion
          expanded={sectionExpanded.includes(currentSection.sectionName)}
          onChange={handleSectionChange(currentSection.sectionName)}
          classes={{
            root: classes.expansionPanelRoot,
          }}
        >
          <CustomAccordionSummary
            expandIcon={<ArrowDropDownIcon classes={{ root: classes.dropDownIconSection }} />}
            aria-controls={currentSection.sectionName}
            id={currentSection.sectionName}
            classes={{
              expandIcon: classes.ExpansionPaneldropDownIcon,
            }}
          >
            {/* <ListItemText primary={sideBarItem.groupName} /> */}
            <div className={classes.sectionSummaryText}>{currentSection.sectionName}</div>

          </CustomAccordionSummary>

          <AccordionDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
            <List component="div" disablePadding dense>
              {
                // eslint-disable-next-line arrow-body-style
                currentSection.items.map((sideBarItem) => {
                  return (
                    <>
                      <Accordion
                        square
                        expanded={groupsExpanded.includes(sideBarItem.groupName)}
                        onChange={handleGroupsChange(sideBarItem.groupName)}
                        classes={{
                          root: classes.expansionPanelsideBarItem,
                        }}
                      >
                        <CustomAccordionSummary
                          expandIcon={(
                            <ExpandMoreIcon
                              classes={{ root: classes.dropDownIconSubSection }}
                              style={{ fontSize: 26 }}
                            />
                                )}
                          aria-controls={sideBarItem.groupName}
                          id={sideBarItem.groupName}
                          className={classes.customExpansionPanelSummaryRoot}
                        >
                          {/* <ListItemText primary={sideBarItem.groupName} /> */}
                          <div
                            id={`filterGroup_${sideBarItem.datafield}`}
                            style={{ color: getGroupNameColor(sideBarItem, currentSection) }}
                            className={classes.subSectionSummaryText}
                          >
                            {sideBarItem.groupName}
                          </div>
                        </CustomAccordionSummary>
                        <AccordionDetails
                          classes={{ root: classes.expansionPanelDetailsRoot }}
                        >
                          <List component="div" disablePadding dense>
                          <div
                            className={classes.sortGroup}
                          >
                            <span
                              className={classes.sortGroupIcon}
                            >
                              <Icon
                                style={{ fontSize: 10 }}
                                onClick={() => { 
                                  onClearGroupFilter(sideBarItem)
                                }}
                              >
                                <img
                                  src={resetIcon.src}
                                  height={resetIcon.size}
                                  width={resetIcon.size}
                                  alt={resetIcon.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                onSortSection(sideBarItem.datafield, 'alphabet');
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItemCounts}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                onSortSection(sideBarItem.datafield, 'count');
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                            {getCheckBoxView(sideBarItem, currentSection)}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                      <div className={classes.selectedCheckboxDisplay}>
                        { !groupsExpanded.includes(sideBarItem.groupName)
                                && showSelectedChecbox(sideBarItem, currentSection)}
                      </div>
                    </>
                  );
                })
              }
            </List>
          </AccordionDetails>
        </Accordion>
      </FacetFilterThemeProvider>
    ))
  }
    </>
  );
};

export default withStyles(styles)(FacetFilters);
