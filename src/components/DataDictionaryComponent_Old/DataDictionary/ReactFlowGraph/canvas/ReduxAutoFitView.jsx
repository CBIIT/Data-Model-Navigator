import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useReactFlow } from 'reactflow';

const ReduxAutoFitView = (nodes) => {
    const { fitView } = useReactFlow();
    // const store = useStoreApi();
    // const state = store.getState();
    // const nodeInternals = useMemo(() => state.nodeInternals);
    useEffect(() => {
        fitView()
    }, []);
    return null;
    // useEffect(() => {
    //     if (nodeInternals && nodeInternals.size > 0) {
    //         console.log('fig', nodeInternals)
    //         const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    //             flowData.nodes,
    //             flowData.edges,
    //             nodeInternals
    //         );
    //         setNodes(layoutedNodes);
    //         setEdges(layoutedEdges);
    //     }
    // }, [flowData])
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxAutoFitView);
