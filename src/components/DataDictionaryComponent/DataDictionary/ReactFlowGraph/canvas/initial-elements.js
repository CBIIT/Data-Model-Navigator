import React from 'react';
import { MarkerType, Position } from 'reactflow';
import studyIcon from './assets/graph_icon/study.svg';

export const nodes = [
  // {
  //   id: '1',
  //   type: 'input',
  //   data: {
  //     label: 'Input Node',
  //   },
  //   position: { x: 250, y: 0 },
  // },
  // {
  //   id: '2',
  //   data: {
  //     label: 'Default Node',
  //   },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   type: 'output',
  //   data: {
  //     label: 'Output Node',
  //   },
  //   position: { x: 400, y: 100 },
  // },
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
    position: { x: 600, y: 200 },
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
    position: { x: 300, y: 225 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 600, y: 100 },
    data: {
      label: 'Case',
      icon: studyIcon,
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
];