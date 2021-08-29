import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

import { logUserOut } from "../apollo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  return (
    <div>
      <PageTitle title="Home" />

      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>

      {data?.seeFeed?.map((photo) => (
        <Photo
          key={photo.id}
          onLoadMore={() => fetchMore({
            variables: {
              offset: data?.feed?.length,
            },
          })}
          {...photo}
        />
      ))}
    </div>
  );
}
export default Home;
