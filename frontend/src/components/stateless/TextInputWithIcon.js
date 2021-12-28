import styled from 'styled-components';
import TextInput from './TextInput';

const TextInputWithIcon = ({ iconComponent, ...props }) => (
  <Wrapper>
    <StyledIcon>
      { iconComponent }
    </StyledIcon>
    <TextInput {...props} styles={{ paddingLeft: '42px' }} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
`;

const StyledIcon = styled.div`
  position: absolute;
  padding: 10px 0 0 10px;
`;

export default TextInputWithIcon;
