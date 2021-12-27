import { useContext } from 'react';
import styled from 'styled-components';
import Linkify from 'linkify-react';
import Avatar from './Avatar';
import H3 from './H3';
import Chip from './Chip';
import decodeHtml from '../utils/decodeHtml';
import { ACTIONS, TwitterContext } from '../context/twitterContext';

const Tweet = ({
  tweet, isEven,
}) => {
  const [state, dispatch] = useContext(TwitterContext);
  const uniqueHashtags = [...new Set(tweet.hashtags)];
  return (
    <StyledTweet isEven={isEven}>
      <div className="avatar">
        <Avatar src={tweet.user.avatarUrl} alt={tweet.user.username} />
      </div>
      <div>
        <H3>
          @
          { tweet.user.username}
        </H3>
        <Linkify tagName="p" options={{ target: '_blank' }}>{ decodeHtml(tweet.text) }</Linkify>
        {uniqueHashtags.map((hashtag) => (
          <Chip key={hashtag} isSelected={state.selectedHashtags.includes(hashtag)} onClick={() => dispatch({ type: ACTIONS.SET_SELECTED_HASHTAGS, payload: hashtag })}>
            #
            { hashtag }
          </Chip>
        ))}
      </div>
    </StyledTweet>
  );
};

const StyledTweet = styled.div`
  padding: 20px 12px 12px 15px;
  display: flex;
  background-color: ${(props) => (props.isEven ? '#fff' : '#f8f9f9')};

  .avatar {
    margin-right: 15px;
  }
`;

export default Tweet;
