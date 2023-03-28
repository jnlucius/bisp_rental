import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Header from "./header";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Layout({ children }) {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let right = null;

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
        <Nav.Link as={Link} href="/login">
          Login
        </Nav.Link>
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
        <Nav.Link as={Link} href="/user" className="text-muted">
          {session.user.name}
        </Nav.Link>
        <Nav.Link as={Link} href="/create">
          <button>New post</button>
        </Nav.Link>
        <Nav.Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </Nav.Link>
      </>
    );
  }

  return (
    <main>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Rentals
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} href="/posts/first-post">
                Link
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {right}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Header />
      <Container>{children}</Container>
    </main>
  );
}
