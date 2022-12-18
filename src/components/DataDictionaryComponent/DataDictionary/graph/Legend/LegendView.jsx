import React, { useState } from 'react';
import { Icon, withStyles } from '@material-ui/core';
import { legendIconUrl } from '../../NodeCategories/helper';
import relationshipSvg from '../../NodeCategories/icons/Legend/lg_relationship_links.svg';
import toggleSvg from '../../NodeCategories/icons/Legend/lg_link.svg';
import Styles from './LegendStyle';
import { capitalizeFirstLetter } from '../../../utils';

const Legend = ({
  classes,
  categoryItems,
  styles,
}) => {
  const [display, setDisplay] = useState(true);
  const toggleLegend = () => setDisplay(!display);
  const categoryListComponent = categoryItems.map((category) => {
    // const categoryColor = getCategoryColor(category);
    // const IconSvg = getLegendCategoryIconSVG(category);
    const imgUrl = `${legendIconUrl}${category}.svg`;
    return (
      <div
        key={category}
        className={classes.category}
      >
        <div className={classes.categoryIcon}>
          <img src={imgUrl} alt="icon"/>
        </div>
        <span className={classes.text}>{capitalizeFirstLetter(category)}</span>
      </div>
    )         
  });

  const ToggleBtn = () => (
    <div className={
      display ? classes.headerExpand : classes.headerCollapse}
    >
      {display && (
        <span className={classes.headerTitle}>Node Category</span>
      )}
      <span
        className={classes.toggleBtn}
        onClick={toggleLegend}
        role='button'
        tabIndex={0}
      >
        <img src={toggleSvg} alt="toggle Legend" />
      </span>
    </div>
  );

  return (
    <>
     <div
      className={display ? classes.legendExpand : classes.legendCollapse}
      style={display ? {...styles.legendExpand}: {...styles.legendCollapse}}>
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
