import type { MDXProps } from 'mdx/types';

declare module './index.mdx' {
  export interface Props extends MDXProps {
    loggedIn: boolean;
  }

  export default function IndexPage(props: Props);
}
