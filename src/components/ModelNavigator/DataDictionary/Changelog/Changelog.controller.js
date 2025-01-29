import React from 'react';
import ChangelogComponent from './Changelog.component';
import { useSelector } from "react-redux";

const ChangelogController = () => {
  const changelogMD = useSelector(
    (state) => state.changelogInfo && state.changelogInfo.mdData
  );

  if (!changelogMD) {
    return <></>;
  }

  return (
    <>
      <ChangelogComponent />
    </>
  );
};

export default ChangelogController;
