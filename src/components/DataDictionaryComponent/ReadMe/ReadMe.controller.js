import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMeComponent from './ReadMe.component';

const ReadMeController = ({
  display,
  displayReadMeDialog,
}) => {
  const [content, setContent] = useState(undefined);
  const readMeUrl = 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md';

  useEffect(() => {
    axios.get(readMeUrl).then((response) => {
        return response;
    }).then((resp) => {
      if (resp.data) {
        setContent(resp.data);
      }
    });
  }, []);
  console.log(content);
  if (!content) {
    return <></>;
  }
  return (
    <>
      <ReadMeComponent
        display={display}
        displayReadMeDialog={displayReadMeDialog}
        content={content}
      />
    </>
  );
}

export default ReadMeController;
