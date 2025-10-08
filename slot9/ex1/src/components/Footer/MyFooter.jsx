import Button from "react-bootstrap/Button";
import "./Footer.css";

export default function MyFooter({ author, email, linkGithub }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <Button variant="link" href={linkGithub} target="_blank" rel="noreferrer">
        My Link Github: {linkGithub}
      </Button>
    </footer>
  );
}
