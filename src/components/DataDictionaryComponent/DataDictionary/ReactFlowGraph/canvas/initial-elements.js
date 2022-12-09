import React from 'react';
import { MarkerType, Position } from 'reactflow';
import studyIcon from './assets/graph_icon/study.svg';
import caseIcon from './assets/graph_icon/case.svg';
import clinicalTrialIcon from './assets/graph_icon/clinical_trial.svg';
import adminIcon from './assets/graph_icon/administrative.svg';
import biospecimenIcon from './assets/graph_icon/biospecimen.svg';

import clinicalIcon from './assets/graph_icon/clinical.svg';

export const nodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 10 },
    data: {
      label: 'Program',
      icon: adminIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Study',
      icon: studyIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '5',
    type: 'custom',
    data: {
      label: 'Study Site',
      icon: studyIcon,
    },
    position: { x: 800, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'custom',
    data: {
      label: 'Cohort',
      icon: studyIcon,
    },
    position: { x: 200, y: 225 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 600, y: 100 },
    data: {
      label: 'Case',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '8',
    type: 'custom',
    data: {
      label: 'Study Site',
      icon: studyIcon,
    },
    position: { x: 600, y: 300 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '9',
    type: 'custom',
    data: {
      label: 'Cohort',
      icon: studyIcon,
    },
    position: { x: 300, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },

  {
    id: '10',
    type: 'custom',
    position: { x: 450, y: 200 },
    data: {
      label: 'Case',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '11',
    type: 'custom',
    data: {
      label: 'Study Site',
      icon: studyIcon,
    },
    position: { x: 600, y: 400 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '12',
    type: 'custom',
    data: {
      label: 'Cohort',
      icon: studyIcon,
    },
    position: { x: 300, y: 425 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '13',
    type: 'custom',
    position: { x: 450, y: 400 },
    data: {
      label: 'Agent',
      icon: clinicalTrialIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '14',
    type: 'custom',
    data: {
      label: 'Adverse Event',
      icon: clinicalTrialIcon,
    },
    position: { x: 500, y: 550 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '15',
    type: 'custom',
    data: {
      label: 'Study Arm',
      icon: studyIcon,
    },
    position: { x: 200, y: 500 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '16',
    type: 'custom',
    position: { x: 250, y: 600 },
    data: {
      label: 'Case',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '17',
    type: 'custom',
    position: { x: 50, y: 400 },
    data: {
      label: 'Canine Individual',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '18',
    type: 'custom',
    position: { x: 250, y: 725 },
    data: {
      label: 'Biospecimen source',
      icon: biospecimenIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '19',
    type: 'custom',
    position: { x: 450, y: 625 },
    data: {
      label: 'Physical exam',
      icon: clinicalTrialIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '19',
    type: 'custom',
    position: { x: 450, y: 725 },
    data: {
      label: 'Prior Surgery',
      icon: clinicalIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '20',
    type: 'custom',
    position: { x: 625, y: 725 },
    data: {
      label: 'Prior Therapy',
      icon: clinicalIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '21',
    type: 'custom',
    position: { x: 400, y: 525 },
    data: {
      label: 'Visit',
      icon: clinicalIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '22',
    type: 'custom',
    position: { x: 450, y: 625 },
    data: {
      label: 'Enrollment',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '23',
    type: 'custom',
    position: { x: 150, y: 150 },
    data: {
      label: 'Image Collection',
      icon: studyIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  {
    id: '24',
    type: 'custom',
    position: { x: 300, y: 650 },
    data: {
      label: 'Vital sign',
      icon: caseIcon,
      selects: {
        'handle-0': 'Bezier',
        'handle-1': 'Bezier',
      },
    },
  },
  // {
  //   id: '7',
  //   type: 'default',
  //   className: 'annotation',
  //   data: {
  //     label: (
  //       <>
  //         On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
  //         <strong>MiniMap</strong>. This is also just a node 🥳
  //       </>
  //     ),
  //   },
  //   draggable: false,
  //   selectable: false,
  //   position: { x: 150, y: 500 },
  // },
];

export const edges = [
  // { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  // { id: 'e1-3', source: '1', target: '3', animated: true },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e16-17',
    source: '4',
    target: '23',
    type: 'smoothstep',
    sourceHandle: 'handle-2',
    data: {
      selectIndex: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-5',
    source: '7',
    target: '8',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '7',
    target: '9',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e10-11',
    source: '10',
    target: '11',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e10-12',
    source: '10',
    target: '12',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e10-12',
    source: '6',
    target: '12',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e13-15',
    source: '13',
    target: '16',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e13-15',
    source: '16',
    target: '13',
    type: 'Bezier',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e13-14',
    source: '13',
    target: '15',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e14-14',
    source: '13',
    target: '14',
    type: 'smoothstep',
    sourceHandle: 'handle-2',
    data: {
      selectIndex: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e16-17',
    source: '16',
    target: '17',
    type: 'smoothstep',
    sourceHandle: 'handle-2',
    data: {
      selectIndex: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e14-14',
    source: '22',
    target: '19',
    type: 'smoothstep',
    sourceHandle: 'handle-2',
    data: {
      selectIndex: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e16-17',
    source: '22',
    target: '20',
    type: 'smoothstep',
    sourceHandle: 'handle-2',
    data: {
      selectIndex: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];