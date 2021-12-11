import styled from 'styled-components';

const Section = styled.section`
	margin:
    ${props => props.marginTop}px
    ${props => props.marginRight}px
    ${props => props.marginBottom}px
    ${props => props.marginLeft}px;
`;

Section.defaultProps = {
	marginTop: 0,
  marginRight: 20,
  marginBottom: 0,
  marginLeft: 20,
}

export default Section;
