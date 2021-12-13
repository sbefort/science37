import styled from 'styled-components';
import Linkify from 'linkify-react';
import Avatar from './Avatar';
import H3 from './H3';
import Chip from './Chip';

const Tweet = ({ tweet, selectedHashtag, onHashtagClick }) => {
  return (
    <StyledTweet>
      <div className="avatar">
        <Avatar src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} />
      </div>
      <div>
        <H3>@{ tweet.user.screen_name}</H3>
        <Linkify tagName="p" options={{target: '_blank'}}>{ tweet.text }</Linkify>
        {tweet.entities.hashtags.map((hashtag) => (
          <Chip isSelected={selectedHashtag === hashtag.text} onClick={() => onHashtagClick(hashtag.text)}>#{ hashtag.text }</Chip>)
        )}
      </div>
    </StyledTweet>
  );
};

const StyledTweet = styled.div`
  padding: 20px 0;
  display: flex;

  .avatar {
    margin-right: 15px;
  }
`;

export default Tweet;
