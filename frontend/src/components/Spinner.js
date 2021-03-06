import styled from 'styled-components';
import { CgSpinner } from 'react-icons/cg';

const Spinner = () => (
  <StyledSpinner>
    <CgSpinner className="spin" />
  </StyledSpinner>
);

const StyledSpinner = styled.div`
  .spin {
    animation: spin 0.7s infinite linear;
    font-size: 30px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(359deg);
    }
  }
`;

export default Spinner;
