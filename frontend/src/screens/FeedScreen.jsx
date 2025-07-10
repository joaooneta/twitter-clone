import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {
  useGetTweetsQuery,
  useCreateTweetMutation,
  useLikeTweetMutation,
} from "../slices/tweetsApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Container, Button, Form, Navbar, Nav, Card } from "react-bootstrap";
import { toast } from "react-toastify";

function FeedScreen() {
  const { data: tweets, isLoading, refetch } = useGetTweetsQuery();

  const [tweet, setTweet] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();
  const [createTweet] = useCreateTweetMutation();
  const [likeTweet] = useLikeTweetMutation();

  async function handleLogout() {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  }

  async function handleTweet(e) {
    e.preventDefault();
    try {
      await createTweet({ content: tweet }).unwrap();
      setTweet("");
      refetch();
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  }

  async function handleLike(tweetId) {
    try {
      await likeTweet(tweetId).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom mb-3">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
          </Nav>
          <Button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container style={{ maxWidth: "600px" }}>
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleTweet}>
              <Form.Group controlId="tweetText">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="O que está acontecendo?"
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                />
              </Form.Group>
              <div className="text-end mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!tweet.trim()}
                  onClick={handleTweet}
                >
                  Tweetar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {!isLoading
          ? tweets.map((tw) => (
              <Card key={tw._id} className="mb-3">
                <Card.Body>
                  <Card.Subtitle className="mb-1 text-muted">
                    {tw.author.name} (@{tw.author.username})
                  </Card.Subtitle>
                  <Card.Text>{tw.content}</Card.Text>
                  <div className="d-flex align-items-center justify-content-end gap-3">
                    <Button
                      size="sm"
                      variant={
                        tw.likes.includes(userInfo._id)
                          ? "danger"
                          : "outline-danger"
                      }
                      onClick={() => handleLike(tw._id)}
                    >
                      ❤️ Curtir
                    </Button>
                    <span>❤️ {tw.likes.length}</span>
                  </div>
                </Card.Body>
              </Card>
            ))
          : "Ausente"}
      </Container>
    </>
  );
}

export default FeedScreen;
