import Head from 'next/head';
import Navbar from './_navbar';

type Props = {
  title: string;
  children: any;
  withNavbar?: boolean;
};

export default function Layout({ title, children, withNavbar }: Props) {
  withNavbar = withNavbar === undefined ? true : withNavbar;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-md mx-auto md:border-l md:border-r border-gray-300 min-h-screen'>
        {withNavbar && <Navbar title={title} />}
        <main>{children}</main>
      </div>
    </div>
  );
}
