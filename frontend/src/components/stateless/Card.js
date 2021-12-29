import styled from 'styled-components';

const Card = ({ children, styles }) => (
  <StyledCard style={styles}>
    { children }
  </StyledCard>
);

const StyledCard = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-top: 1px solid #dedede;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.1), -1px 2px 4px rgba(0,0,0,0.1);
`;

export default Card;
