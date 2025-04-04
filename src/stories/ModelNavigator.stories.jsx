import React from 'react';
import ModelNavigator from './ModelNavigator';

export default {
  title: 'Model Navigator',
  component: ModelNavigator,
  parameters: {},
  argTypes: {
    pdfDownloadEnabled: {
      control: {
        type: 'boolean',
      },
    },
    modelUrl: {
      control: {
        type: 'text',
      },
    },
    propsUrl: {
      control: {
        type: 'text',
      },
    },
    readMeUrl: {
      control: {
        type: 'text',
      }
    },
    changelogUrl: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args) => <ModelNavigator {...args} />;

export const Navigator = Template.bind({});

Navigator.args = {
  pdfDownloadEnabled: true,
  modelUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/cds-model.yml",
  propsUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/cds-model-props.yml",
  readMeUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/README.md",
  changelogUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/version-history.md",
};

