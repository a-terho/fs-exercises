import styled from 'styled-components';

const Header = styled.h2`
  color: white;
  text-shadow: 0px 0px 5px black;
  margin-left: 0.7em;
`;

const ConfirmButton = styled.button`
  color: white;
  width: 100px;
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

export { Header, ConfirmButton };
