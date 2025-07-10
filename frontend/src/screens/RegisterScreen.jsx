import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/feed");
    }
  }, [userInfo, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await register({ name, username, email, password }).unwrap();
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
          <h2 className="text-center mb-4">Register</h2>

          <Form.Group controlId="name" className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="username" className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="examplename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

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
              Sign Up
            </Button>

            <div className="text-center mt-3">
              Already have an account? <Link to="/">Sign In</Link>
            </div>
          </Form>
        </Card>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
