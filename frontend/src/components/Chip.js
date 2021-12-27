import styled from 'styled-components';

const Chip = styled.div`
  background-color: #e7f3fa;
  color: #367ab5;
  border-radius: 1.5em;
  display: inline-block;
  padding: 0.8em 1.2em;
  margin: 0.4em 0.4em;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.1s linear;

  ${({ isSelected }) => isSelected && `
    background-color: lightslategrey;
    color: #fff;
  `}
`;

export default Chip;
