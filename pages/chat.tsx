import Layout from '../components/shared/_layout';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import ChatComponent from '../components/ChatItem';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import useWindowSize from '../hooks/UseWindowSize';

const centerFixed = {
  left: '50%',
  marginLeft: '-14rem',
};

export default function ChatPage() {
  const placeHolders = useMemo(
    () => [
      'Hai, barang ini ready ?',
      'Bisa dikirim hari ini ?',
      'Terima kasih!',
    ],
    [],
  );

  const placeholders_reply = useMemo(
    () => [
      'Barang ready, silahkan diorder. Terimakasih!',
      'Barang dapat dikirim hari ini, silahkan diorder. Terima kasih!',
    ],
    [],
  );

  const size = useWindowSize();
  const [chats, setChats] = useState([
    {
      isCustomer: false,
      text: 'Ada yang bisa saya bantu ?',
    },
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(
    (text: string, isCustomer: boolean) => {
      if (message === text) return;
      const newChats = [
        ...chats,
        {
          isCustomer,
          text,
        },
      ];
      setChats(newChats);
    },
    [chats, message],
  );

  useEffect(() => {
    const placeholderIdx = placeHolders
      .filter((_, idx) => idx != 2)
      .map((p) => p.toLowerCase())
      .findIndex((p) => p === message.toLowerCase());
    if (placeholderIdx !== -1) {
      setTimeout(() => {
        if (chats.find((c, i) => c.text === placeholders_reply[placeholderIdx]))
          return;
        sendMessage(placeholders_reply[placeholderIdx], false);
        setMessage('');
      }, 2000);
    }
  }, [chats, message, placeholders_reply, placeHolders, sendMessage]);

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!message) return;
    sendMessage(message, true);
  };

  return (
    <Layout title='Chat With Us'>
      <div className='space-y-7'>
        {chats.map((chat, idx) => (
          <ChatComponent
            key={idx}
            isCustomer={chat.isCustomer}
            text={chat.text}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={size.width > 448 ? centerFixed : {}}
        className={classNames(
          `fixed mx-auto bottom-0 w-full`,
          { 'max-w-md': size.width > 448 },
          { 'left-0': size.width <= 448 },
        )}>
        <div className='flex overflow-auto space-x-1 mx-1 mb-2 text-gray-700'>
          {placeHolders.map((p, idx) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMessage(p);
                sendMessage(p, true);
              }}
              style={{ background: '#81d2f7' }}
              className='py-1 px-3 rounded-full text-sm truncate cursor-pointer'
              key={idx}>
              {p}
            </button>
          ))}
        </div>
        <div className='bg-gray-300 p-2 flex items-center'>
          <div className='flex-1'>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='shadow-sm w-full focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-400 rounded p-1'
            />
          </div>
          <button className='ml-2 flex items-center' type='submit'>
            <Image src='/images/send.png' alt='Send' width={35} height={35} />
          </button>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
}
