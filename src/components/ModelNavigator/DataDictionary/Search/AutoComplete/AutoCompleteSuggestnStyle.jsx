export default () => ({
  suggestionList: {
    paddingRight: "10px",
    position: "relative",
    zIndex: 1,
  },
  suggestionItem: {
    backgroundColor: "#fff",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "15px",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
    whiteSpace: "nowrap",
    borderTop: "1px solid #606060",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      // color: '#fff',
    },
    // '&:hover $highlight': {
    //   color: '#ef8523',
    // },
  },
  highlight: {
    color: "#3283c8",
    // '&:hover': {
    //   color: '#ef8523',
    // }
  },
});
