export default () => ({
  searchHistory: {
    padding: "15px",
    borderTop: "1px solid #606060",
    fontSize: "14px",
    color: "#606060",
  },
  serachedItems: {
    marginTop: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "#e7e7e7 1px solid",
    borderLeft: "#e7e7e7 1px solid",
    borderRight: "#e7e7e7 1px solid",
    cursor: "pointer",

    "&:first-child": {
      borderTop: "#e7e7e7 1px solid",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
    },
    "&:last-child": {
      borderTop: "#e7e7e7 1px solid",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
    },
    "&:hover": {
      backgroundColor: "#f1f1f1",
      // color: '#fff',
      // '& $itemBadge': {
      //   backgroundColor: '#fff',
      //   color: '#3283c8',
      // },
    },
  },
  itemKeyword: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemBadge: {
    color: "rgb(13, 113, 163)",
    fontSize: "14px",
    fontFamily: "Nunito",
    marginRight: "0px",
  },
  itemBadgeZero: {
    backgroundColor: "#606060",
  },
  titleText: {
    display: "inline",
  },
  clear: {
    color: "#3283c8",
    cursor: "pointer",
    fontFamily: "Open Sans",
    float: "right",
    "&:hover": {
      color: "#05b8ee",
    },
  },
});
