import IndexPage from './index.mdx';
import { auth } from '@/auth';

const Index = async () => {
  const session = await auth();

  return (
    <div className="markdown">
      <IndexPage loggedIn={!!session} />
    </div>
  );
};

export default Index;
