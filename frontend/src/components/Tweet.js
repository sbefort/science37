import styled from 'styled-components';
import get from 'lodash/get';

const Tweet = ({ tweet }) => {
  console.log(tweet.user);
  return (
    <StyledTweet>
        <h3>{get(tweet, 'user.screen_name')}</h3>
      { tweet.text }
    </StyledTweet>
 );
};

const StyledTweet = styled.div`
  margin-bottom: 10px;
`;

export default Tweet;
