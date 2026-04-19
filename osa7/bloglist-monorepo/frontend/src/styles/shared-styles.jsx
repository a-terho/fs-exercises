import styled from 'styled-components';

const Container = styled.div`
  font-family: Helvetica, sans-serif;
  margin: 1em;
  padding: 1em;
  box-shadow: 0.1em 0.1em 0.5em black;
`;

const Topheader = styled.h1`
  color: white;
  text-shadow: 0px 0px 5px black;
  margin-left: 0.7em;
`;

const Header = styled.h2`
  margin: 0;
  margin-bottom: 0.8em;
`;

const Subheader = styled.h3`
  margin: 0;
  margin-top: 2.5em;
`;

const Row = styled.div`
  margin-bottom: 1em;
`;

const ConfirmButton = styled.button`
  color: white;
  width: auto;
  background-color: steelblue;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 0.8em 0.8em 0.8em 2em;
  padding: 0.8em 1.2em 0.8em 1.2em;
  box-shadow: 0.1em 0.1em 0.5em black;
  &:hover {
    background-color: lightskyblue;
  }
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.3em;
  border-style: none;
  border-bottom-style: solid;
  &:focus {
    outline: none;
  }
`;

const BlogLink = styled.li`
  font-family: Helvetica, sans-serif;
  list-style-type: '🔹';
  padding-left: 0.5em;
  margin: 0.5em;
`;

export {
  Container,
  Topheader,
  Header,
  Subheader,
  Row,
  ConfirmButton,
  Input,
  BlogLink,
};
