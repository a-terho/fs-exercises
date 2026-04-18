import useNotify from '../hooks/useNotify';
import styled from 'styled-components';

const Box = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 0.9em;
  padding: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  border-style: dotted;

  &.info {
    background: lightblue;
    border-color: black;
    color: black;
  }

  &.error {
    background: lightcoral;
    border-color: white;
    color: white;
  }
`;

const Notification = () => {
  const { notification } = useNotify();

  // piilota ilmoitusikkuna, jos viestiä ei ole
  if (!notification) return null;

  return <Box className={notification.style}>{notification.text}</Box>;
};

export default Notification;
