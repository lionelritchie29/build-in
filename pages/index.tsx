import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../assets/images/logo.png';
import Layout from '../components/shared/_layout';

const Index: NextPage = () => {
  const router = useRouter();

  const redirectToLoginPage = () => {
    router.push('/auth/login');
  };

  const redirectToRegisterPage = () => {
    router.push('/auth/register');
  };

  return (
    <Layout withNavbar={false} title=''>
      <div className='flex justify-center items-center min-h-screen w-full'>
        <div>
          <div className='w-1/2 mx-auto'>
            <Image src={logo} alt='logo' />
          </div>

          <div className='w-2/3 mx-auto flex flex-col space-y-3 mt-8'>
            <button
              onClick={() => redirectToLoginPage()}
              type='button'
              className='w-full justify-center inline-flex items-center px-4 py-3 border border-transparent font-medium rounded-full shadow-sm text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 uppercase'>
              Log in
            </button>

            <button
              onClick={() => redirectToRegisterPage()}
              type='button'
              className='w-full justify-center inline-flex items-center px-4 py-3 border border-transparent font-medium rounded-full shadow-sm text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 uppercase'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
