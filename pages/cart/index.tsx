import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/shared/_layout';
import { CartService } from '../../services/CartService';
import chatIcon from '../../public/images/chat.png';
import BottomNav from '../../components/shared/_BottomNav';
import { Else, If, Then } from 'react-if';
import CartItemComponent from '../../components/CartItem';
import { useRouter } from 'next/router';

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [checkeds, setCheckeds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const crts = CartService.getAll();
      setCarts(crts);

      const checkedArr = [];
      crts.forEach((c) => checkedArr.push(false));
      setCheckeds(checkedArr);
    }
  }, []);

  const clear = () => {
    if (checkeds.every((c) => c === false)) {
      alert('Select an item first');
      return;
    }

    checkeds.forEach((c, i) => {
      if (c) CartService.delete(carts[i].id);
    });

    const updatedCarts = CartService.getAll();
    setCarts(updatedCarts);
    setCheckeds(Array(updatedCarts.length).fill(false));
  };

  const checkAll = (e) => {
    if (!e.target.checked) {
      setCheckeds(checkeds.map((_) => false));
    } else {
      setCheckeds(checkeds.map((_) => true));
    }
  };

  const addQty = (id: string) => {
    setCarts(CartService.addQty(id));
  };

  const reduceQty = (id: string) => {
    setCarts(CartService.reduceQty(id));
  };

  const bottomLinks = [
    {
      title: 'Chat',
      image: chatIcon,
      href: '/chat',
    },
    {
      title: '',
      text: 'Order',
      onClick: () => {
        router.push('/order');
      },
    },
  ];

  return (
    <Layout title='Bu!ld-In'>
      <If condition={!carts.length}>
        <Then>
          <div className='text-center'>Your cart is empty</div>
        </Then>
        <Else>
          <div className='flex justify-between mb-4 mt-2'>
            <div className='w-1/2 flex items-center'>
              <input type='checkbox' onChange={checkAll} />
              <span className='block ml-1'>Select All</span>
            </div>

            <button
              type='button'
              onClick={() => clear()}
              className='justify-center inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2'>
              Clear
            </button>
          </div>
        </Else>
      </If>

      <ul className='grid grid-cols-1 gap-4'>
        {carts.map((cart, idx) => {
          return (
            <li key={cart.id}>
              <CartItemComponent
                addQty={addQty}
                reduceQty={reduceQty}
                cart={cart}
                idx={idx}
                checkeds={checkeds}
                setCheckeds={setCheckeds}
                forCartPage={true}
              />
            </li>
          );
        })}
      </ul>

      {carts.length > 0 && <BottomNav links={bottomLinks} />}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
