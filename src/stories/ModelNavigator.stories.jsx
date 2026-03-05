import React from 'react';
import DMN from './ModelNavigator';

export default {
  title: 'Model Navigator',
  component: DMN,
  parameters: {},
  argTypes: {
    mdf: {
      name: 'Model Definition Files (MDF)',
      control: {
        type: 'text',
      },
    },
    readMeUrl: {
      name: 'ReadMe Markdown URL',
      control: {
        type: 'text',
      }
    },
    readMeAllowDownload: {
      name: 'ReadMe Download Enabled',
      control: {
        type: 'boolean',
      },
    },
    changelogUrl: {
      name: 'Version History Markdown URL',
      control: {
        type: 'text',
      },
    },
    pdfDownloadEnabled: {
      name: 'Enable Downloads',
      control: {
        type: 'boolean',
      },
    },
    iconMap: {
      name: 'Icon Map',
      control: {
        type: 'object',
      },
    },
  },
};

const Template = (args) => <DMN {...args} />;

export const ModelNavigator = Template.bind({});

ModelNavigator.args = {
  mdf: [
    "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/refs/heads/dev2/cache/CDS/10.0.0/cds-model.yml",
    "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/refs/heads/dev2/cache/CDS/10.0.0/cds-model-props.yml",
  ].join("\n"),
  readMeUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/10.0.0/README.md",
  changelogUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/10.0.0/version-history.md",
  pdfDownloadEnabled: true,
  iconMap: null,
  readMeAllowDownload: true,
};

