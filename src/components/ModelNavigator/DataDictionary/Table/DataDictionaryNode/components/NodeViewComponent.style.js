export default () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    "&:hover $nodeTitle": {
      color: "#3283c8",
    },
  },
  titleAndDescContainer: {
    display: "flex",
  },
  tagsAndDescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    minWidth: "859px",
  },
  tagsAndBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assignmentAndClassTags: {
    display: "flex",
    gap: "15px",
  },
  overlaySpacer: {
    width: "74px",
  },
  spacer: {
    width: "45px",
  },
  nodeTitle: {
    width: "260px",
    flexGrow: "0",
    flexShrink: "0",
    "-moz-user-select": "none",
    "-webkit-user-select": "none",
    fontWeight: "900",
    "-ms-user-select": "none",
    userSelect: "none",
    fontSize: "15px",
    lineHeight: "14px",
    "&:hover": {
      color: "#3283c8",
    },
  },
  nodeDescription: {
    paddingRight: "33px",
    fontSize: "14px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#4A4A4A",
    textAlign: "justify",
    margin: "0px",
  },
  propertyCountBtn: {
    width: "150px",
    height: "26px",
    backgroundColor: "#EEF5F7",
  },
  nodeLabel: {
    color: "#8e8e8e",
    fontWeight: "900",
    borderRadius: "100px",
    border: "1px solid #cdcdcd",
    background: "#fff",
    fontSize: "12px",
    height: "22px",
    width: "136px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  nodeAssignment: {
    color: "#2982af",
    fontWeight: "500",
  },
  nodeClass: {
    color: "#2982af",
    fontWeight: "500",
  },
});
