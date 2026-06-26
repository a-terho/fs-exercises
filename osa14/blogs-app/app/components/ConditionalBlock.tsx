interface Props {
  condition: boolean;
  children: React.ReactNode;
}

const ConditionalBlock = ({ condition, children }: Props) => {
  return condition ? children : null;
};

export default ConditionalBlock;
