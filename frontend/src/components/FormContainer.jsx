import { Container } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      {children}
    </Container>
  );
}

export default FormContainer;
