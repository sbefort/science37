import styled from 'styled-components';

const Card = ({ children }) => (
  <StyledCard>
    { children }
  </StyledCard>
);

const StyledCard = styled.div`
  box-shadow: 10px 8px 10px gray, -10px 8px 15px gray, 10px 8px 15px gray;

  border-top: 1px solid #ccc;
  padding: 10px;
  box-shadow: 1px 1px 7px rgba(0,0,0,0.1), -1px 1px 7px rgba(0,0,0,0.1);
`;

export default Card;
