import React, { useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../../utils';
import { getLegendCategoryIconSVG, getCategoryColor } from '../../NodeCategories/helper';
import relationshipSvg from '../../NodeCategories/icons/Legend/lg_relationship_links.svg';
import toggleSvg from '../../NodeCategories/icons/Legend/lg_link.svg';
import Styles from './LegendStyle';

const Legend = ({
  classes,
  categoryItems,
}) => {
  const [display, setDisplay] = useState(true);
  const toggleLegend = () => setDisplay(!display);

  const categoryListComponent = categoryItems.map((category) => {
    const categoryColor = getCategoryColor(category);
    const IconSvg = getLegendCategoryIconSVG(category);
    console.log(category);
    return (
      <div
        key={category}
        className={classes.category}
      >
        <span className={classes.circleWrapper}>
          { IconSvg ? <IconSvg/>: (
            <span className={classes.circleWrapper} style={{ backgroundColor: categoryColor }} />
            )
          }
        </span>
        <span className={classes.text}>{capitalizeFirstLetter(category)}</span>
      </div>
    )         
  });

  const ToggleBtn = () => (
    <>
      <span
        className={classes.info}
        onClick={toggleLegend}
        onKeyPress={toggleLegend}
        role='button'
        tabIndex={0}
      >
        <img src={toggleSvg} alt="toggle Legend" />
      </span>
    </>
  );

  return (
    <>
     <div className={classes.legend}>
      {
        display ? (
        <>
          <ToggleBtn />
          <div className={classes.item}>
            <img src={relationshipSvg} alt="relation" />
            <span className={classes.text}>Relationships</span>
          </div>
          {categoryListComponent}
        </>)
        
        : (
          <>
            <ToggleBtn />
          </>
        )
      }
     </div>
    </>
  )
}

export default withStyles(Styles)(Legend);
