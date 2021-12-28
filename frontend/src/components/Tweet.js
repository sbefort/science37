import { useContext } from 'react';
import styled from 'styled-components';
import Linkify from 'linkify-react';
import Avatar from './stateless/Avatar';
import H3 from './stateless/H3';
import Chips from './stateless/Chips';
import Chip from './stateless/Chip';
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
        <Chips>
          {uniqueHashtags.map((hashtag) => (
            <Chip key={hashtag} isSelected={state.selectedHashtags.includes(hashtag)} onClick={() => dispatch({ type: ACTIONS.SET_SELECTED_HASHTAGS, payload: hashtag })}>
              #
              { hashtag }
            </Chip>
          ))}
        </Chips>
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
