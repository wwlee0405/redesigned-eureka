import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
}
export default Home;
