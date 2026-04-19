import styled from 'styled-components';

const Button = styled.button`
  text-transform: uppercase;
  background-color: white;
  margin-left: 1em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 5px;
`;

const LikeButton = styled(Button)`
  color: steelblue;
  border: solid steelblue;
  &:hover {
    background-color: steelblue;
    color: white;
  }
`;

const RemoveButton = styled(Button)`
  color: lightcoral;
  border: solid lightcoral;
  &:hover {
    background-color: lightcoral;
    color: white;
  }
`;

export { Button, LikeButton, RemoveButton };
