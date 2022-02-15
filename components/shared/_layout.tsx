import classNames from 'classnames';
import Head from 'next/head';
import Navbar from './_navbar';

type Props = {
  title: string;
  children: any;
  withNavbar?: boolean;
  className?: string;
  showMenu?: boolean;
  showCart?: boolean;
};

export default function Layout({
  title,
  children,
  withNavbar,
  className,
  showMenu,
  showCart,
}: Props) {
  withNavbar = withNavbar === undefined ? true : withNavbar;
  showMenu = showMenu === undefined ? false : showMenu;
  showCart = showCart === undefined ? false : showCart;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-md mx-auto md:border-l md:border-r pb-16 border-gray-300 min-h-screen relative overflow-hidden'>
        {withNavbar && (
          <Navbar title={title} showCart={showCart} showMenu={showMenu} />
        )}
        <main className={classNames('px-4 py-2', className)}>{children}</main>
      </div>
    </div>
  );
}
