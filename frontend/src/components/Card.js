import styled from 'styled-components';

const Card = ({ children }) => (
  <StyledCard>
    { children }
  </StyledCard>
);

const StyledCard = styled.div`
  box-shadow: 10px 8px 10px gray, -10px 8px 15px gray, 10px 8px 15px gray;
`;

export default Card;
