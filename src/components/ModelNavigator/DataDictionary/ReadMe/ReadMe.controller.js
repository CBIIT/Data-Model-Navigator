import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReadMeComponent from './ReadMe.component';

const ReadMeController = ({
  display,
  displayReadMeDialog,
  config,
  content,
}) => {
  if (!content) {
    return <></>;
  }

  return (
    <>
      <ReadMeComponent
        display={display}
        displayReadMeDialog={displayReadMeDialog}
        content={content}
        title={config.readMeTitle}
      />
    </>
  );
};

export default ReadMeController;
