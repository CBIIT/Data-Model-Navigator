import React, { useState } from "react";
import { Icon, withStyles } from "@material-ui/core";
import { legendIconUrl } from "../../NodeCategories/helper";
import relationshipSvg from "../../NodeCategories/icons/Legend/lg_relationship_links.svg";
import toggleSvg from "../../NodeCategories/icons/Legend/lg_link.svg";
import Styles from "./LegendStyle";
import { capitalizeFirstLetter } from "../../utils";
import clsx from "clsx";

const Legend = ({ classes, categoryItems, styles, overlayPropertyHidden }) => {
  const [display, setDisplay] = useState(true);
  const toggleLegend = () => setDisplay(!display);

  /**
  * set legend position
  */
  const scrollBarWidth = document.documentElement.clientWidth;
  const positionRight = window.innerWidth - scrollBarWidth;
  const position = { right: positionRight };

  const categoryListComponent = categoryItems.map((category) => {
    const imgUrl = `${legendIconUrl}${category}.svg`;
    return (
      <div key={category} className={classes.category}>
        <div className={classes.categoryIcon}>
          <img src={imgUrl} alt="icon" />
        </div>
        <span className={classes.text}>{capitalizeFirstLetter(category)}</span>
      </div>
    );
  });

  const ToggleBtn = () => (
    <div className={display ? classes.headerExpand : classes.headerCollapse}>
      {display && <span className={classes.headerTitle}>Node Category</span>}
      <span
        className={classes.toggleBtn}
        onClick={toggleLegend}
        role="button"
        tabIndex={0}
      >
        <img src={toggleSvg} alt="toggle Legend" />
      </span>
    </div>
  );

  return (
    <>
      <div
        className={clsx({
          [classes.zvlaue]: overlayPropertyHidden,
          [classes.legendExpand]: display,
          [classes.legendCollapse]: !display,
        })}
        style={
          display
            ? { ...styles?.legendExpand, ...position }
            : { ...styles?.legendCollapse, ...position }
        }
      >
        {
          <>
            <ToggleBtn />
            {display && (
              <>
                <div className={classes.item}>
                  <img src={relationshipSvg} alt="relation" />
                  <span className={classes.text}>relationship links</span>
                </div>
                {categoryListComponent}
              </>
            )}
          </>
        }
      </div>
    </>
  );
};

export default withStyles(Styles)(Legend);
