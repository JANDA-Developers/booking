/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Post = ({ match }) => <div>{`hi ${match.params.title} is here`}</div>;

const Posts = () => (
  <div>
    <Link to="/Post/JD1">JD1</Link>
    <Link to="/Post/JD2">JD2</Link>
    <Link to="/Post/JD3">JD3</Link>
    <Link to="/Post/JD4">JD4</Link>
    <Route path="/Post/:title" component={Post} />
  </div>
);

Post.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Posts;
