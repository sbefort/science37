import styled from 'styled-components';

const Card = ({ children }) => (
  <StyledCard>
    { children }
  </StyledCard>
);

const StyledCard = styled.div`
  border-top: 1px solid #dedede;
  padding: 1em;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.1), -1px 2px 4px rgba(0,0,0,0.1);
`;

export default Card;
