import classNames from 'classnames';
import Head from 'next/head';
import Navbar from './_navbar';

type Props = {
  title: string;
  children: any;
  withNavbar?: boolean;
  className?: string;
};

export default function Layout({
  title,
  children,
  withNavbar,
  className,
}: Props) {
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
        <main className={classNames('px-4 py-2', className)}>{children}</main>
      </div>
    </div>
  );
}
