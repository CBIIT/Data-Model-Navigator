export default () => ({
  expansionPanelRoot: {
    background: "#EAEAEA",
    margin: "auto",
    position: "initial",
    boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
    "&:before": {
      position: "initial",
    },
  },
  expansionPanelsideBarItem: {
    boxShadow: "none",
    borderTop: "1px solid #D2D2D2",
    // borderLeft: '1px solid #D2D2D2',
    // borderRight: '1px solid #D2D2D2',
    "&:last-child": {
      borderBottom: "1px solid #D2D2D2",
    },
    margin: "auto",
    position: "initial",
    "&:before": {
      position: "initial",
    },
  },
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: "rgba(0, 0, 0, 0.1)",
  },
  expansionPanelDetailsRoot: {
    display: "block",
  },
  dropDownIconSection: {
    fill: "#000000",
  },
  dropDownIconSubSection: {
    marginLeft: "0px",
    fill: "#000000",
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: "row-reverse",
    paddingLeft: 0,
    boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
  },
  ExpansionPaneldropDownIcon: {
    left: "-98%",
  },
  sectionSummaryText: {
    color: "#323232",
    fontFamily: "Raleway",
    fontSize: "15px",
    fontWeight: "bold",
    letterSpacing: "0.25px",
    lineHeight: "26px",
    paddingLeft: 9,
  },
  subSectionSummaryText: {
    marginLeft: "10px",
    lineHeight: 0,
    color: "#323232",
    fontFamily: "Raleway",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.25px",
  },
  checkboxRoot: {
    height: 12,
  },
  listItemGutters: {
    padding: "8px 0px 8px 23px",
    // marginLeft: '-5px',
  },
  selectedCheckboxDisplay: {
    maxHeight: "600px",
    overflow: "auto",
  },
  sortGroup: {
    display: "flex",
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #B1B1B1",
    boxShadow: "inset -10px 2px 10px -7px rgb(50 50 50 / 25%)",
  },
  sortGroupItem: {
    cursor: "pointer",
    fontFamily: "Nunito",
    fontSize: "10px",
    marginRight: "32px",
  },
  sortGroupIcon: {
    cursor: "pointer",
    fontFamily: "Nunito",
    fontSize: "10px",
    marginRight: "12px",
    marginLeft: "16px",
  },
  showMore: {
    float: "right",
    paddingRight: "5px",
    cursor: "pointer",
    fontSize: "10px",
  },
  clearAllButtonRoot: {
    margin: "auto",
  },
  customButton: {
    borderRadius: "100px",
    marginTop: "4px",
    minHeight: "20px",
    fontSize: 9,
    textTransform: "none",
    color: "#3d4241",
    marginLeft: "100px",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#566672",
      color: "white",
    },
  },
  sortGroupItemCounts: {
    cursor: "pointer",
    fontFamily: "Nunito",
    fontSize: "10px",
    float: "right",
    marginRight: "10px",
    marginTop: "5px",
  },
});
