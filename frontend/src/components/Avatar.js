import styled from 'styled-components';

const Avatar = ({ src, alt = "" }) => (
  <StyledAvatar src={src} alt={alt} />
);

const StyledAvatar = styled.img`
  vertical-align: middle;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

StyledAvatar.displayName = 'img';

export default Avatar;
