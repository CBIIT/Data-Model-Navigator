import React from 'react';

import ModelNavigator from './ModelNavigator';

export default {
  title: 'Example/ModelNavigator',
  component: ModelNavigator,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
  },
};

const Template = (args) => <ModelNavigator {...args} />;

export const Navigator = Template.bind({});

Navigator.args = {};

