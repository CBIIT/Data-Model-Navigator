import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import relationshipSvg from "../../NodeCategories/icons/Legend/lg_relationship_links.svg";
import toggleSvg from "../../NodeCategories/icons/Legend/lg_link.svg";
import Styles from "./LegendStyle";
import { capitalizeFirstLetter } from "../../utils";
import clsx from "clsx";
import { getIconDetails } from "../../../../../utils/iconUtils";
import { DefaultIcon } from "../../../../../config/IconMap";

const Legend = ({ classes, categoryItems, styles, overlayPropertyHidden, iconMapInfo }) => {
  const [display, setDisplay] = useState(true);
  const toggleLegend = () => setDisplay(!display);

  const categoryListComponent = categoryItems.map((category) => (
    <div key={category} className={classes.category}>
      <div className={classes.categoryIcon}>
        <img
          src={getIconDetails(category, iconMapInfo?.map).svg}
          alt="icon"
          style={{ width: '32px' }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = DefaultIcon.svg;
          }}
        />
      </div>
      <span className={classes.text}>{capitalizeFirstLetter(category)}</span>
    </div>
  )
  );

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
            ? { ...styles?.legendExpand, right: 0, }
            : { ...styles?.legendCollapse, right: 0 }
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
