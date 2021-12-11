import styled from 'styled-components';

const Container = styled.div`
	display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.breakpoint}) {
    flex-direction: column;
  }
`;

const Pane = styled.div`
	flex: ${props => props.weight};
`;

const SplitScreen = ({ children, leftWeight = 1, rightWeight = 1, breakpoint = '800px' }) => {
	const [left, right] = children;
	return (
		<Container breakpoint={breakpoint}>
			<Pane weight={leftWeight}>
				{left}
			</Pane>
			<Pane weight={rightWeight}>
				{right}
			</Pane>
		</Container>
	);
};

export default SplitScreen;
