import styled from 'styled-components';
// Why negative margin?
//
// Each chip has a left and right margin of 0.4em.
// When the chips wrap, the parent container needs negative margin for wrapped chips to line up with the other content.
const Chips = styled.div`
  margin-left: -0.4rem;
  margin-right: -0.4rem;
`;

export default Chips;
