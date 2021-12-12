// This layout component is an old-fashioned way of achieving a responsive design with
// sections that collapse in the order desired. One challenge with a flex or grid layout
// is that a right sidebar will collapse to the bottom of the page. With this layout,
// a right sidebar can be floated to the right and collapse above the main content.

import styled from 'styled-components';

const defaultStyles = {
  marginTop: '1em',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
};

const Pane = styled.section`
	float: ${props => props.floatDirection};
	width: ${props => props.width};

  @media (max-width: ${props => props.breakpoint}px) {
    width: 100%;
  }
`;

const MasonryItem = ({ floatDirection = 'left', width = '100%', breakpoint = 800, children, styles }) => {
return (
    <Pane floatDirection={floatDirection} width={width} breakpoint={breakpoint} style={{
      ...defaultStyles,
      ...styles
    }}>
      {children}
    </Pane>
	);
};

export default MasonryItem;
