import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/feed");
    }
  }, [userInfo, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/feed");
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  }

  return (
    <div>
      <FormContainer>
        <Card
          style={{ width: "100%", maxWidth: "400px" }}
          className="p-4 shadow"
        >
          <h2 className="text-center mb-4">Log In</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={isLoading}
            >
              Sign In
            </Button>

            <div className="text-center mt-3">
              New user? <Link to="/register">register</Link>
            </div>
          </Form>
        </Card>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
