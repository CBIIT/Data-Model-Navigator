import React from 'react';
import ModelNavigator from './ModelNavigator';

export default {
  title: 'Model Navigator',
  component: ModelNavigator,
  parameters: {},
  argTypes: {
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
  },
};

const Template = (args) => <ModelNavigator {...args} />;

export const Navigator = Template.bind({});

// const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model.yml';
// const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model-props.yml';

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/ctdc-model/initial_cmb_rebuild_of_ctdc_data_model/model-desc/ctdc_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/ctdc-model/initial_cmb_rebuild_of_ctdc_data_model/model-desc/ctdc_model_properties_file.yaml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model_Props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model-props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_properties.yaml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/CDS/4.0.0/cds-model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/CDS/4.0.0/cds-model-props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/ICDC/1.0.0/icdc-model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/ICDC/1.0.0/icdc-model-props.yml";

Navigator.args = {
  modelUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/4.0.0/cds-model.yml",
  propsUrl: "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/4.0.0/cds-model-props.yml",
};

