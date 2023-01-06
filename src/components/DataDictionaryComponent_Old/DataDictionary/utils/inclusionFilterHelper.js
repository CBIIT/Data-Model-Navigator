import {
    newHandleExplorerFilter,
    getSubjectItemCount,
} from './modelExplorerUtil';

// export const inclusionFilterHelper = (selectedFilters, filterHashMap) => {
//   let filteredDict = [];
//   selectedFilters.forEach(([key, value], index) => {
//     value.forEach((filterValue) => {
//       filteredDict.push(...filterHashMap.get(filterValue.toLowerCase()));
//     });
//   });
//   return Object.fromEntries(filteredDict);
// }

const filterNodesByProperty = (property = [], inclusionFilter, dictionary) => {
    let filterProps = [];
    if (property.length == 0) {
        Object.keys(dictionary).forEach((elem) => {
            const items = dictionary[elem].properties;
            Object.keys(items).forEach((key) => {
                property.push(items[key]);
            });
        });
    }

    inclusionFilter.forEach(([key, items]) => {
        const toLowerCase = items.map(e => e.toLowerCase());
        if (key === 'inclusion') {
            filterProps = filterProps.filter((item) => toLowerCase.indexOf(item.propertyType) !== -1);
        } else {
            filterProps = filterProps.filter((item) => toLowerCase.indexOf(item.display) !== -1);

        }
    });
    const filterDictionary = {};
    property.forEach(item => {
        if (!filterDictionary[item.category]) {
            filterDictionary[item.category] = dictionary[item.category];
        }
    });
    return filterDictionary;
}

const getPropertySubjectCountAndFilterDictionary = (dictionary, inclusionFilter) => {
    const nodeProperies = [];
    const subjectCount = {};
    // get properties from node present on dictionary
    if (dictionary) {
        Object.keys(dictionary).forEach((elem) => {
            const items = dictionary[elem].properties;
            Object.keys(items).forEach((key) => {
                nodeProperies.push(items[key]);
            });
        });
    }

    let filterProps = nodeProperies;
    if (inclusionFilter.length > 1) {
        inclusionFilter.forEach(([key, items]) => {
            const toLowerCase = items.map(e => e.toLowerCase());
            if (key === 'inclusion') {
                filterProps = filterProps.filter((item) => toLowerCase.indexOf(item.propertyType) !== -1);
            } else {
                filterProps = filterProps.filter((item) => toLowerCase.indexOf(item.display) !== -1);
            }
        });
        filterProps.forEach((item) => {
            if (!subjectCount[item.display]) {
                subjectCount[item.display] = 0;
            };
            subjectCount[item.display] += 1;
            if (!subjectCount[item.propertyType]) {
                subjectCount[item.propertyType] = 0;
            };
            subjectCount[item.propertyType] += 1;
        });
        const filterDictionary = filterNodesByProperty(filterProps, inclusionFilter, dictionary);

        return { count: subjectCount, dictionary: filterDictionary };
    }

    inclusionFilter.forEach(([, items]) => {
        const toLowerCase = items.map(e => e.toLowerCase());
        filterProps.forEach(prop => {
            toLowerCase.forEach(item => {
                if (`${prop.display}`.toLowerCase() == item
                    || `${prop.propertyType}`.toLowerCase() == item) {
                    if (!subjectCount[prop.display]) {
                        subjectCount[prop.display] = 0;
                    }
                    subjectCount[prop.display] += 1;
                    if (!subjectCount[prop.propertyType]) {
                        subjectCount[prop.propertyType] = 0;
                    }
                    subjectCount[prop.propertyType] += 1;
                }
            })
        })
    });
    const filterDictionary = filterNodesByProperty(filterProps, inclusionFilter, dictionary);
    return { count: subjectCount, dictionary: filterDictionary };
}

export const inclusionFilterHelper = (data, allActiveFilters, currentFilter) => {
    const processedFilters = Object.entries(allActiveFilters)
        .filter(([, value]) => value.length > 0);
    //** initial state when there is no active filters */
    const { unfilteredDictionary, filterHashMap, facetfilterConfig, properties } = data;
    if (processedFilters.length == 0) {
        const dictionary = (!unfilteredDictionary) ? data : unfilteredDictionary;
        return { subjectCounts: getSubjectItemCount(dictionary), dictionary: dictionary }
    }

    //** check active filters */
    const filterSections = processedFilters.map((item) => item[0]);
    const selectedSections = facetfilterConfig.facetSearchData.filter(section => filterSections
        .indexOf(section.datafield) !== -1);

    let filteredDictionary = newHandleExplorerFilter(processedFilters, filterHashMap);
    const filteredDictCounts = getSubjectItemCount(filteredDictionary);

    //** if any inclusion filter is active - inclusion behavior for both filter by inclusion and nodes */
    const { inclusion, uiDisplay } = allActiveFilters;
    // create new dictionary to track properties count only
    const currectSelectedSection = facetfilterConfig.facetSearchData.filter(section => section.datafield === currentFilter.datafield);
    const inclusionItem = 'inclusion';
    const uiDisplayItem = 'uiDisplay';

    const activeInclusionFilter = (currentFilter.datafield === inclusionItem || currentFilter.datafield === uiDisplayItem);

    const inclusionSections = facetfilterConfig.facetSearchData.filter(section => (section.datafield
        === inclusionItem || section.datafield === uiDisplayItem));
    const filterByUiDisplay = processedFilters.filter(item => (item[0] === uiDisplayItem));
    const filterByInclusion = processedFilters.filter(item => (item[0] === inclusionItem || item[0] === uiDisplayItem));
    const filterWithoutInclusion = processedFilters.filter(item => (item[0] !== inclusionItem && item[0] !== uiDisplayItem));

    //** generate inclusion filtered dictionary */
    const inclusionDictionary = newHandleExplorerFilter(filterByInclusion, filterHashMap);
    const noneInclusionDictionary = newHandleExplorerFilter(filterWithoutInclusion, filterHashMap);
    //** select exclusion filter dictionary filteredDictionary if filter item is more than 2 */
    const selectDictionary = (processedFilters.length < 4) ? inclusionDictionary : filteredDictionary;

    const selectedSectionCounts = getSubjectItemCount(selectDictionary, selectedSections, currentFilter);
    const inclusionFilterItems = facetfilterConfig.facetSearchData.filter(item => item.datafield === inclusionItem)[0];
    const uiDisplayFilterItems = facetfilterConfig.facetSearchData.filter(item => item.datafield === uiDisplayItem)[0];

    let facetSectionCount = filteredDictCounts;
    let propsFilter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
    let inclusionSubjectCount = propsFilter.count;

    //** When all inclusion facet search filter are active*/
    if (filterByInclusion.length === 2 && filterWithoutInclusion.length == 0) {
        const filter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
        inclusionSubjectCount = filter.count;
        filteredDictionary = filter.dictionary;
        const otherFilterItem = (currentFilter.datafield !== inclusionItem)
            ? inclusionFilterItems : uiDisplayFilterItems;
        otherFilterItem.checkboxItems.forEach(item => {
            filteredDictCounts[item.group] = inclusionSubjectCount[item.group]
                ? inclusionSubjectCount[item.group] : 0;
        });
        const currentrFilter = filterByInclusion.filter(item => (item[0] !== currentFilter.datafield));
        const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
        ...filterByUiDisplay];
        const inclusionFilters = (!activeInclusionFilter) ? allInclusionFilterItem : currentrFilter;
        const currentPropsFilter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, inclusionFilters);
        const currentPropsFilterCount = currentPropsFilter.count;
        facetSectionCount = getSubjectItemCount(filter.dictionary);
        inclusionFilterItems.checkboxItems.forEach(item => {
            facetSectionCount[item.group] = currentPropsFilterCount[item.group] ? currentPropsFilterCount[item.group] : 0;
        });
        uiDisplayFilterItems.checkboxItems.forEach(item => {
            facetSectionCount[item.group] = currentPropsFilterCount[item.group] ? currentPropsFilterCount[item.group] : 0;
        });
        const combinedSubjectCounts = Object.assign({}, facetSectionCount, inclusionSubjectCount);
        return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
    }

    if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 0) {
        //filter dictionary by inclusion
        const nonInclusionSectionCounts = getSubjectItemCount(unfilteredDictionary, selectedSections);
        const filter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
        inclusionSubjectCount = filter.count;
        if ((inclusion.length > 0 && uiDisplay.length === 0)) {
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                filteredDictCounts[item.group] = inclusionSubjectCount[item.group]
                    ? inclusionSubjectCount[item.group] : 0;
            });
        }
        if (uiDisplay.length > 0 && inclusion.length === 0) {
            inclusionFilterItems.checkboxItems.forEach(item => {
                filteredDictCounts[item.group] = inclusionSubjectCount[item.group]
                    ? inclusionSubjectCount[item.group] : 0;
            });
        }
        const combinedSubjectCounts = Object.assign({}, filteredDictCounts, nonInclusionSectionCounts);
        return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
    }

    //** when inclusion by filter is two and node facet section is one */
    if (filterByInclusion.length === 2 && filterWithoutInclusion.length === 1) {
        //** chcek if the current filter inclusion filter */
        if (activeInclusionFilter) {
            /** get current filter  */
            const currentInculsionSection = filterByInclusion.filter((item) => item[0] !== currentFilter.datafield);
            const currentInculsionFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, currentInculsionSection);
            let inclusionFilterOnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            // const selectedFilterCount = currentInculsionFilter.count;
            const inclusionSubjectCount = inclusionFilterOnFilteredDictionary.count;
            // ** adjust inclusion subject count with node filter */
            const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
            ...filterByUiDisplay];

            //** get count for all the inclusion subject */
            const allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, allInclusionFilterItem);
            const allInclusionSubjectCount = allInclusionFilters.count;

            //**  get count for only active inclusion fiters*/
            const activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            const activeInclusionSubjectCount = activeInclusionFilters.count;

            const inclusionFilterOnUnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
            const subjectCount1 = getSubjectItemCount(inclusionFilterOnFilteredDictionary.dictionary);
            const subjectCount2 = getSubjectItemCount(inclusionFilterOnUnFilteredDictionary.dictionary);

            // update the subject
            const overideSubjectCount = {};
            //** update the inclusion subject count base on active or all inclusion filter */
            inclusionFilterItems.checkboxItems.forEach(item => {
                inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });
            Object.keys(subjectCount1).forEach(key => {
                overideSubjectCount[key] = (subjectCount1[key] > 0) ? subjectCount1[key] : subjectCount2[key];
            });
            const combinedSubjectCounts = Object.assign({}, overideSubjectCount, inclusionSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: inclusionFilterOnFilteredDictionary.dictionary };

        }
        //** when node filter facet is current selection */
        if (!activeInclusionFilter) {
            //** if the filter section facet is not inclusion */
            const inclusionFilter = getPropertySubjectCountAndFilterDictionary(inclusionDictionary, filterByInclusion);
            facetSectionCount = getSubjectItemCount(inclusionFilter.dictionary);
            const filterByNodeInclusion = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
            let subjectCount = getSubjectItemCount(filterByNodeInclusion.dictionary);
            // ** adjust inclusion subject count with node filter */
            const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
            ...filterByUiDisplay];

            //** get count for all the inclusion subject */
            const allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, allInclusionFilterItem);
            const allInclusionSubjectCount = allInclusionFilters.count;

            //**  get count for only active inclusion fiters*/
            const activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            const activeInclusionSubjectCount = activeInclusionFilters.count;

            const overideSubjectCount = {};
            //** update the inclusion subject count base on active or all inclusion filter */
            inclusionFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });

            //** update the subject count for the current section */
            const currentSelection = selectedSections.filter(item => item.datafield === currentFilter.datafield)[0];
            if (currentSelection) {
                currentSelection.checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    overideSubjectCount[key] = facetSectionCount[key];
                });
            } else {
                // update the last checked section of filter by node
                subjectCount = getSubjectItemCount(filteredDictionary);
                const activeSection = facetfilterConfig.facetSearchData.filter(section => filterWithoutInclusion[0][0]
                    .includes(section.datafield));
                activeSection[0].checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    overideSubjectCount[key] = facetSectionCount[key];
                });
            }
            const combinedSubjectCounts = Object.assign({}, subjectCount, overideSubjectCount);
            //set filtered dcitionary based on node and inclusion filter
            filteredDictionary = activeInclusionFilters.dictionary;
            //return filtered dictionary and subject count
            return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
        }
    }

    if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 1) {
        const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
        ["uiDisplay", ["Yes", "No"]]];
        const allInclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, allInclusionFilterItem);
        const currentPropsFilterCount = allInclusionFilter.count;

        const selectedInclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
        const selectedInclusionFilterCount = selectedInclusionFilter.count;
        const overideSubjectCount = {};
        if (uiDisplay.length > 0){
            inclusionFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = selectedInclusionFilterCount[item.group]
                    ? selectedInclusionFilterCount[item.group] : 0;
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = currentPropsFilterCount[item.group]
                    ? currentPropsFilterCount[item.group] : 0;
            });
        } else {
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = selectedInclusionFilterCount[item.group]
                    ? selectedInclusionFilterCount[item.group] : 0;
            });
            inclusionFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = currentPropsFilterCount[item.group]
                    ? currentPropsFilterCount[item.group] : 0;
            });
        }
        //** set current section with filter by inclusion */
        const nonInclusionSectionCounts = getSubjectItemCount(inclusionDictionary, selectedSections);
        const combinedSubjectCounts = Object.assign({}, filteredDictCounts, nonInclusionSectionCounts, overideSubjectCount);
        return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
    }

    if (filterByInclusion.length === 2 && filterWithoutInclusion.length === 2) {
        if (activeInclusionFilter) {
            /** get current filter  */
            const currentInculsionSection = filterByInclusion.filter((item) => item[0] !== currentFilter.datafield);
            const currentInculsionFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, currentInculsionSection);
            let inclusionFilterOnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            // const selectedFilterCount = currentInculsionFilter.count;
            const inclusionSubjectCount = inclusionFilterOnFilteredDictionary.count;
            // ** adjust inclusion subject count with node filter */
            const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
            ...filterByUiDisplay];

            //** get count for all the inclusion subject */
            const allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, allInclusionFilterItem);
            const allInclusionSubjectCount = allInclusionFilters.count;

            //**  get count for only active inclusion fiters*/
            const activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            const activeInclusionSubjectCount = activeInclusionFilters.count;

            const inclusionFilterOnUnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
            // const subjectCount1 = getSubjectItemCount(inclusionFilterOnFilteredDictionary.dictionary);
            // const subjectCount2 = getSubjectItemCount(inclusionFilterOnUnFilteredDictionary.dictionary);

            // update the subject
            const overideSubjectCount = {};
            //** update the inclusion subject count base on active or all inclusion filter */
            inclusionFilterItems.checkboxItems.forEach(item => {
                inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });

            const otherFilters = filterWithoutInclusion.filter(item => item[0] !== currentFilter.datafield);
            const otherInclusionDictionary = newHandleExplorerFilter(otherFilters, filterHashMap);
            const otherFilterByInclusion = getPropertySubjectCountAndFilterDictionary(otherInclusionDictionary, filterByInclusion);
            const otherSelectionCounts = getSubjectItemCount(otherFilterByInclusion.dictionary, selectedSections);
            selectedSections.forEach(section => {
                section.checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    overideSubjectCount[key] = otherSelectionCounts[key];
                });
            });
            // Object.keys(subjectCount1).forEach(key => {
            //   overideSubjectCount[key] = (subjectCount1[key] > 0) ? subjectCount1[key] : subjectCount2[key];
            // });
            const combinedSubjectCounts = Object.assign({}, overideSubjectCount, inclusionSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: inclusionFilterOnFilteredDictionary.dictionary };
        } else {
            const inclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
            facetSectionCount = getSubjectItemCount(inclusionFilter.dictionary);
            const filterByNodeInclusion = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
            let subjectCount = getSubjectItemCount(filterByNodeInclusion.dictionary);
            // ** adjust inclusion subject count with node filter */
            const allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]],
            ...filterByUiDisplay];

            //** get count for all the inclusion subject */
            const allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, allInclusionFilterItem);
            const allInclusionSubjectCount = allInclusionFilters.count;

            //**  get count for only active inclusion fiters*/
            const activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
            const activeInclusionSubjectCount = activeInclusionFilters.count;

            //** update the inclusion subject count base on active or all inclusion filter */
            inclusionFilterItems.checkboxItems.forEach(item => {
                subjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                subjectCount[item.group] = activeInclusionSubjectCount[item.group]
                    ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
            });

            //** update the subject count for the current section */
            const currentSelection = selectedSections.filter(item => item.datafield === currentFilter.datafield)[0];
            if (currentSelection) {
                const otherFilters = filterWithoutInclusion.filter(item => item[0] !== currentFilter.datafield);
                const otherInclusionDictionary = newHandleExplorerFilter(otherFilters, filterHashMap);
                const otherFilterByInclusion = getPropertySubjectCountAndFilterDictionary(otherInclusionDictionary, filterByInclusion);
                const otherSelectionCounts = getSubjectItemCount(otherFilterByInclusion.dictionary, selectedSections);
                currentSelection.checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    subjectCount[key] = otherSelectionCounts[key];
                });
            }
            //set filtered dcitionary based on node and inclusion filter
            filteredDictionary = activeInclusionFilters.dictionary;
            //return filtered dictionary and subject count
            return { subjectCounts: subjectCount, dictionary: filteredDictionary };
        }
    }

    if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 2) {
        const nonInclusionSectionCounts = getSubjectItemCount(noneInclusionDictionary, selectedSections, currentFilter);
        propsFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
        inclusionSubjectCount = propsFilter.count;
        const currentSelection = selectedSections.filter(item => item.datafield === currentFilter.datafield)[0];
        const otherFilters = processedFilters.filter(item => item[0] !== currentFilter.datafield);
        const otherInclusionDictionary = newHandleExplorerFilter(otherFilters, filterHashMap);
        const otherSelectionCounts = getSubjectItemCount(otherInclusionDictionary, selectedSections, currentFilter);
        if (currentSelection) {
            const overideSubjectCount = {};
            currentSelection.checkboxItems.forEach(item => {
                const key = item.name.toLowerCase();
                overideSubjectCount[key] = otherSelectionCounts[key];
            });
            const filterByPropType = processedFilters.filter(item => (item[0] === inclusionItem));
            const filter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByPropType);
            const filterCount = filter.count;
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = filterCount[item.group] ? filterCount[item.group] : 0;
            });
            if (inclusion.length > 0) {
                inclusionFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = nonInclusionSectionCounts[item.group] ? nonInclusionSectionCounts[item.group] : 0;
                });
                uiDisplayFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
                });
            }
            if (uiDisplay.length > 0) {
                uiDisplayFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = nonInclusionSectionCounts[item.group] ? nonInclusionSectionCounts[item.group] : 0;
                });
                inclusionFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
                });
            }
            const combinedSubjectCounts = Object.assign({}, filteredDictCounts, overideSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
        } else {
            const overideSubjectCount = {};
            const uncheckedSection = facetfilterConfig.facetSearchData.filter(item => item.datafield === currentFilter.datafield)[0];
            inclusionFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
            });
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
            });
            if (currentFilter.datafield === inclusionItem) {
                const inclusionCount = getSubjectItemCount(noneInclusionDictionary);
                uiDisplayFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = inclusionCount[item.group] ? inclusionCount[item.group] : 0;
                });
            }
            if (currentFilter.datafield === uiDisplayItem) {
                const inclusionCount = getSubjectItemCount(noneInclusionDictionary);
                inclusionFilterItems.checkboxItems.forEach(item => {
                    overideSubjectCount[item.group] = inclusionCount[item.group] ? inclusionCount[item.group] : 0
                });
            }

            const inclusionFilterCounts = getSubjectItemCount(inclusionDictionary);
            const categorySection = facetfilterConfig.facetSearchData.filter(item => item.datafield === "category")[0];
            categorySection.checkboxItems.forEach(item => {
                const key = item.name.toLowerCase();
                overideSubjectCount[key] = inclusionFilterCounts[key];
            });
            if (!activeInclusionFilter) {
                if (uncheckedSection) {
                    uncheckedSection.checkboxItems.forEach(item => {
                        const key = item.name.toLowerCase();
                        overideSubjectCount[key] = filteredDictCounts[key];
                    });
                }
            }

            const combinedSubjectCounts = Object.assign({}, filteredDictCounts, overideSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
        }
    }


    if (filterWithoutInclusion.length > 2) {
        const nonInclusionSectionCounts = getSubjectItemCount(noneInclusionDictionary, selectedSections, currentFilter);
        propsFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
        inclusionSubjectCount = propsFilter.count;
        const currentSelection = selectedSections.filter(item => item.datafield === currentFilter.datafield)[0];
        const otherFilters = processedFilters.filter(item => item[0] !== currentFilter.datafield);
        const otherInclusionDictionary = newHandleExplorerFilter(otherFilters, filterHashMap);
        const otherSelectionCounts = getSubjectItemCount(otherInclusionDictionary, selectedSections, currentFilter);
        if (currentSelection) {
            const overideSubjectCount = {};
            uiDisplayFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
            });
            inclusionFilterItems.checkboxItems.forEach(item => {
                overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
            });
            currentSelection.checkboxItems.forEach(item => {
                const key = item.name.toLowerCase();
                overideSubjectCount[key] = otherSelectionCounts[key];
            });
            if (currentSelection && filterByInclusion.length === 2) {
                if (currentFilter.datafield === inclusionItem) {
                    const filterByDisplay = processedFilters.filter(item => (item[0] === uiDisplayItem));
                    const filter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByDisplay);
                    const filterCount = filter.count;
                    inclusionFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = filterCount[item.group] ? filterCount[item.group] : 0
                    });
                } else {
                    const filterByPropType = processedFilters.filter(item => (item[0] === inclusionItem));
                    const filter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByPropType);
                    const filterCount = filter.count;
                    uiDisplayFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = filterCount[item.group] ? filterCount[item.group] : 0;
                    });
                }
            }
            if (currentSelection && filterByInclusion.length === 1) {
                if (currentFilter.datafield === inclusionItem) {
                    inclusionFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = nonInclusionSectionCounts[item.group] ? nonInclusionSectionCounts[item.group] : 0;
                    });
                } else {
                    uiDisplayFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = nonInclusionSectionCounts[item.group] ? nonInclusionSectionCounts[item.group] : 0;
                    });
                }
            }
            if (currentFilter.datafield === 'category') {
                currentSelection.checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    overideSubjectCount[key] = otherSelectionCounts[key];
                });
            }
            const combinedSubjectCounts = Object.assign({}, filteredDictCounts, overideSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
        } else {
            const overideSubjectCount = {};
            if (activeInclusionFilter) {
                if (currentFilter.datafield === inclusionItem) {
                    inclusionFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
                    });
                } else {
                    uiDisplayFilterItems.checkboxItems.forEach(item => {
                        overideSubjectCount[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
                    });
                }
            }
            if (currentFilter.datafield === 'category') {
                const categorySection = facetfilterConfig.facetSearchData.filter(item => item.datafield === "category")[0];
                categorySection.checkboxItems.forEach(item => {
                    const key = item.name.toLowerCase();
                    overideSubjectCount[key] = filteredDictCounts[key];
                });
            }
            const combinedSubjectCounts = Object.assign({}, nonInclusionSectionCounts, overideSubjectCount);
            return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
        }
    }

    const combinedSubjectCounts = Object.assign({}, filteredDictCounts, selectedSectionCounts);
    return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary };
}