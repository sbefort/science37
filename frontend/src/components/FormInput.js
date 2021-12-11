import styled from 'styled-components';

const FormInput = ({ type = 'text', placeholder = '', onChange, className = '' }) => (
  <StyledFormInput
    type={type}
    placeholder={placeholder}
    onChange={onChange}
  />
);

const StyledFormInput = styled.input`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding:  8px 8px 8px 45px;
  width: 100%;
`;

export default FormInput;
