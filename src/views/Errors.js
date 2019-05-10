import React from "react";
import { Container, Button } from "shards-react";
import {Link} from 'react-router-dom';

const Errors = (props) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>{props.type}</h2>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <Link className="pill" to="/">&larr; Take me home</Link>
      </div>
    </div>
  </Container>
);

export default Errors;
