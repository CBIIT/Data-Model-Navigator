import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { getLegendCategoryIconSVG, getCategoryColor } from '../../NodeCategories/helper';
import relationshipSvg from '../../NodeCategories/icons/Legend/lg_relationship_links.svg';
import toggleSvg from '../../NodeCategories/icons/Legend/lg_link.svg';
import Styles from './LegendStyle';
import { capitalizeFirstLetter } from '../../../utils';

const Legend = ({
  classes,
  categoryItems,
}) => {
  const [display, setDisplay] = useState(true);
  const toggleLegend = () => setDisplay(!display);

  const categoryListComponent = categoryItems.map((category) => {
    // const categoryColor = getCategoryColor(category);
    const IconSvg = getLegendCategoryIconSVG(category);
    return (
      <div
        key={category}
        className={classes.category}
      >
        <div className={classes.categoryIcon}>
            <IconSvg/>
        </div>
        <span className={classes.text}>{capitalizeFirstLetter(category)}</span>
      </div>
    )         
  });

  const ToggleBtn = () => (
    <div className={display ? classes.headerExpand : classes.headerCollapse}>
      {display && (
        <span className={classes.headerTitle}>Node Category</span>
      )}
      <span
        className={classes.toggleBtn}
        onClick={toggleLegend}
        onKeyPress={toggleLegend}
        role='button'
        tabIndex={0}
      >
        <img src={toggleSvg} alt="toggle Legend" />
      </span>
    </div>
  );

  return (
    <>
     <div className={display ? classes.legendExapand : classes.legendCollapse}>
      {
        <>
          <ToggleBtn />
          {
            display && (
              <>
                <div className={classes.item}>
                  <img src={relationshipSvg} alt="relation" />
                  <span className={classes.text}>relationship links</span>
                </div>
                {categoryListComponent}
              </>
            )
          }
        </>
      }
     </div>
    </>
  )
}

export default withStyles(Styles)(Legend);
