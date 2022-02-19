import classNames from 'classnames';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from './_navbar';

type Props = {
  title: string;
  children: any;
  withNavbar?: boolean;
  className?: string;
  showMenu?: boolean;
  showCart?: boolean;
  withPadding?: boolean;
  showFilter?: boolean;
  custom?: 'architecture' | 'interior' | 'furniture' | '';
  backLink?: string;
};

export default function Layout({
  title,
  children,
  withNavbar,
  className,
  showMenu,
  showCart,
  withPadding,
  custom,
  showFilter,
  backLink,
}: Props) {
  withNavbar = withNavbar === undefined ? true : withNavbar;
  showMenu = showMenu === undefined ? false : showMenu;
  showCart = showCart === undefined ? false : showCart;
  withPadding = withPadding === undefined ? true : withPadding;
  showFilter = showFilter === undefined ? false : showFilter;
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPromp] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPromp(e);
        setShowInstall(true);
        console.log('Before install prompt fired');
      });

      window.addEventListener('appinstalled', () => {
        setShowInstall(false);
        setDeferredPromp(null);
        console.log('PWA was installed');
      });
    }
  }, []);

  const onInstallBtnClick = async () => {
    setShowInstall(false);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPromp(null);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-md mx-auto md:border-l md:border-r pb-16 border-gray-300 min-h-screen relative overflow-hidden'>
        {showInstall && (
          <div className='flex justify-between items-center px-2 py-2 border-b border-t border-gray-500'>
            <span className='block font-semibold '>Install app</span>

            <button
              onClick={() => onInstallBtnClick()}
              className='inline-flex mt-1 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2'>
              Download
            </button>
          </div>
        )}
        {withNavbar && (
          <Navbar
            showFilter={showFilter}
            custom={custom}
            title={title}
            showCart={showCart}
            showMenu={showMenu}
            backLink={backLink}
          />
        )}
        <main className={classNames({ 'px-4 py-2': withPadding }, className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
