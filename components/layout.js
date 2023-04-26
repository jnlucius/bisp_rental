import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Header from "./header";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Row, Col } from "react-bootstrap";

export default function Layout({ children, home }) {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let right,
    heading = null;

  if (status === "loading") {
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <>
        <Nav.Link
          as={Link}
          href="/api/auth/signin"
          data-active={isActive("/signup")}
        >
          Log in
        </Nav.Link>
      </>
    );
  }

  if (session) {
    right = (
      <>
        <Nav.Link as={Link} href="/" className="text-muted">
          {session.user.name}
        </Nav.Link>

        <Nav.Link style={{ marginRight: "-1em" }} className="pt-0">
          <button className="btn btn-primary p-1" onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </Nav.Link>
      </>
    );
    heading = (
      <Container className="mt-3">
        <Row>
          <Col>
            <h3>Welcome, {session.user.name}</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link href={"/create"}>
              <h4 className="btn btn-primary">New Post</h4>
            </Link>
            <Link href={"/drafts"}>
              <h4 className="btn btn-primary ms-2">Drafts</h4>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <main>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand className=" pb-2" as={Link} href="/">
            Rentals
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} href={"/drafts"}>
                Drafts
              </Nav.Link>

              {right}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {home && <>{heading}</>}
      <Container>{children}</Container>
    </main>
  );
}
