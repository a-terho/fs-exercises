import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: Props) => {
  return (
    <Link href={href} className="hover:text-gray-400">
      {children}
    </Link>
  );
};

export default NavLink;
