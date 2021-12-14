import styled from 'styled-components';
import Linkify from 'linkify-react';
import uniq from 'lodash/uniq';
import Avatar from './Avatar';
import H3 from './H3';
import Chip from './Chip';
import decodeHtml from '../utils/decodeHtml';

const Tweet = ({
  tweet, selectedHashtag, onHashtagClick, isEven,
}) => (
  <StyledTweet isEven={isEven}>
    <div className="avatar">
      <Avatar src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} />
    </div>
    <div>
      <H3>
        @
        { tweet.user.screen_name}
      </H3>
      <Linkify tagName="p" options={{ target: '_blank' }}>{ decodeHtml(tweet.text) }</Linkify>
      {uniq(tweet.entities.hashtags.map((hashtag) => hashtag.text)).map((hashtag) => (
        <Chip key={hashtag} isSelected={selectedHashtag === hashtag} onClick={() => onHashtagClick(hashtag)}>
          #
          { hashtag }
        </Chip>
      ))}
    </div>
  </StyledTweet>
);

const StyledTweet = styled.div`
  padding: 20px 12px 12px 15px;
  display: flex;
  background-color: ${(props) => (props.isEven ? '#fff' : '#f8f9f9')};

  .avatar {
    margin-right: 15px;
  }
`;

export default Tweet;
