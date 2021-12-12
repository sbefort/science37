import styled from 'styled-components';
const defaultStyles = {
  paddingTop: '12px',
  paddingRight: '8px',
  paddingBottom: '12px',
  paddingLeft: '8px',
};

const TextInput = ({ type = 'text', placeholder = '', onChange, styles }) => (
  <StyledTextInput
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    style={{
      ...defaultStyles,
      ...styles
    }}
  />
);

const StyledTextInput = styled.input`
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 15px;
`;

export default TextInput;
