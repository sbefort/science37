import styled from 'styled-components';
import Avatar from './Avatar';
import H3 from './H3';
import Chip from './Chip';

const Tweet = ({ tweet }) => {
  console.log(tweet.user);
  return (
    <StyledTweet>
      <div className="avatar">
        <Avatar src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} />
      </div>
      <div>
        <H3>@{ tweet.user.screen_name}</H3>
        <p>{ tweet.text }</p>
        {tweet.entities.hashtags.map((hashtag) => <Chip>{ hashtag.text }</Chip>)}
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
