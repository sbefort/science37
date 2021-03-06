import styled from 'styled-components';

const defaultStyles = {
  paddingTop: '12px',
  paddingRight: '8px',
  paddingBottom: '12px',
  paddingLeft: '8px',
};

const TextInput = ({
  type = 'text', placeholder = '', onChange, value, styles,
}) => (
  <StyledTextInput
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    style={{
      ...defaultStyles,
      ...styles,
    }}
  />
);

const StyledTextInput = styled.input`
  border-radius: 5px;
  border: 1px solid #bcc2c5;
  width: 100%;
  font-size: 0.9em;

  :focus-visible {
    outline: none;
  }
`;

export default TextInput;
