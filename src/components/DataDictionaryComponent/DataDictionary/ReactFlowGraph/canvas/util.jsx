
export const nodeColor = (node) => {
    switch (node.category) {
        case 'administrative':
            return '#9B2D20';
        case 'study':
            return '#9875FF';
        case 'case':
            return '#FF7F15';
        case 'clinical_trial':
            return '#00A1BB';
        case 'biospecimen':
            return '#00785A';
        case 'analysis':
            return '#B533A9';
        case 'data_file':
            return '#00AD0E';
        case 'clinical':
            return '#1C75BC';
        default:
            return '#ff0072';
    }
};