import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '../../../../../../components/shared/_layout';
import accesories from '../../../../../../data/accesories.json';
import furnitures from '../../../../../../data/furnitures.json';
import materials from '../../../../../../data/materials.json';
import others from '../../../../../../data/others.json';
import { Switch, Case, Default, If, Then } from 'react-if';
import { capitalizeFirstLetter, formatter } from '../../../../../../lib/helper';
import cartIcon from '../../../../../../public/images/cart.png';
import chatIcon from '../../../../../../public/images/chat.png';
import BottomNav from '../../../../../../components/shared/_BottomNav';
import { CartService } from '../../../../../../services/CartService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function ProductDetailPage({ product }) {
  const router = useRouter();
  const { id: cat_id, sub_id, product_id } = router.query;

  const canDisplay = (key: string): boolean => {
    if (key.toLowerCase() === 'price' && product.services) return false;

    if (
      key.toLowerCase() === 'id' ||
      key.toLowerCase() === 'name' ||
      key.toLowerCase() === 'image' ||
      key.toLowerCase() === 'variations' ||
      key.toLowerCase() === 'seller' ||
      key.toLowerCase() === 'services'
    )
      return false;
    return true;
  };

  const mapKeyToHeader = (key: string): string => {
    switch (key.toLowerCase()) {
      case 'price':
        return 'Harga';
      case 'size':
        return 'Ukuran';
      case 'weight':
        return 'Berat';
      case 'color':
        return 'Warna';
      case 'motive':
        return 'Motif';
      default:
        return key;
    }
  };

  const renderMaterial = () => {
    if (!product.material) return '';
    return product.material.join(', ');
  };

  const bottomLinks = [
    {
      title: '',
      image: chatIcon,
      href: '/home',
    },
    {
      title: '',
      image: cartIcon,
      href: '/cart',
    },
    {
      title: '',
      href: '/home',
      text: 'Order',
      onClick: () => {
        const catId = cat_id as string;
        const subId = sub_id as string;
        const prodId = product_id as string;
        const price: number =
          typeof product.price === 'string'
            ? parseInt(product.price.split('-')[0])
            : product.price;
        CartService.add(
          catId,
          subId,
          prodId,
          product.image,
          price,
          product.name,
        );
        toast.success('Product succesfully added to the cart!');
      },
    },
  ];

  return (
    <Layout title='Bu!ld-In'>
      <div className='mt-3'>
        <Image
          src={`/images/furniture/beds/2.jpg`}
          alt={product.name}
          width={400}
          height={300}
          className='object-contain rounded'
        />
        <h1 className='text-xl font-semibold'>{product.name}</h1>
      </div>

      <ul className='mt-4 space-y-1'>
        {Object.keys(product).map((key, idx) => {
          return (
            <li key={idx}>
              <If condition={canDisplay(key)}>
                <Then>
                  <Switch>
                    <Case condition={key.toLowerCase() === 'header'}>
                      <span className='block font-medium'>{product[key]}</span>
                    </Case>
                    <Case condition={key.toLowerCase() === 'description'}>
                      <div className='flex flex-col'>
                        <span className='block font-medium'>
                          {capitalizeFirstLetter(mapKeyToHeader(key))}:
                        </span>
                        <span className='block'>{product[key]}</span>
                      </div>
                    </Case>
                    <Case condition={key.toLowerCase() === 'material'}>
                      <div className='flex'>
                        <span className='block font-medium'>
                          {capitalizeFirstLetter(mapKeyToHeader(key))}:
                        </span>
                        <span className='block ml-1'>{renderMaterial()}</span>
                      </div>
                    </Case>
                    <Case condition={key.toLowerCase() === 'price'}>
                      <div className='flex'>
                        <span className='block font-medium'>
                          {capitalizeFirstLetter(mapKeyToHeader(key))}:
                        </span>
                        <span className='block ml-1'>
                          {formatter.format(product[key])}
                        </span>
                      </div>
                    </Case>
                    <Default>
                      <div className='flex'>
                        <span className='block font-medium'>
                          {capitalizeFirstLetter(mapKeyToHeader(key))}:
                        </span>
                        <span className='block ml-1'>
                          <span className='block'>{product[key]}</span>
                        </span>
                      </div>
                    </Default>
                  </Switch>
                </Then>
              </If>
            </li>
          );
        })}
      </ul>

      <If condition={product.services}>
        <Then>
          <h2 className='text-xl font-medium mt-6 mb-2'>Harga Service</h2>
          <ul className='grid grid-cols-1 gap-4'>
            {product.services?.map((service) => {
              return (
                <li key={service} className='flex items-center relative'>
                  <input className='block w-6 h-6' type='checkbox' />
                  <span className='block ml-1 text-sm'>{service}</span>
                </li>
              );
            })}
          </ul>
        </Then>
      </If>

      <If condition={product.variations}>
        <Then>
          <h2 className='text-xl font-medium mt-6'>Variasi</h2>
          {product.variations?.map((variation) => {
            return (
              <div key={variation.type} className='mt-2'>
                <If condition={product.variations.length > 1}>
                  <Then>
                    <span className='block text-base font-medium'>
                      {variation.type}
                    </span>
                  </Then>
                </If>

                <If
                  condition={
                    variation.type.toLowerCase() === 'ukuran' ||
                    variation.type.toLowerCase() === 'checkedcolor' ||
                    variation.type.toLowerCase() === 'warna'
                  }>
                  <Then>
                    <ul
                      className={`grid ${
                        variation.type.toLowerCase() === 'checkedcolor'
                          ? 'grid-cols-3'
                          : 'grid-cols-2'
                      } gap-4 mb-4`}>
                      {variation.options.map((option) => (
                        <li key={option} className='flex items-center'>
                          <input className='block w-6 h-6' type='checkbox' />
                          <span className='block ml-1 text-sm'>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </Then>
                </If>

                <If condition={variation.type.toLowerCase() === 'color'}>
                  <Then>
                    <ul className='grid grid-cols-5 gap-4 mb-4'>
                      {variation.options.map((option) => (
                        <li key={option} className='flex items-center'>
                          <div
                            className='rounded-full shadow w-7 h-7 border border-gray-300'
                            style={{ background: option }}></div>
                        </li>
                      ))}
                    </ul>
                  </Then>
                </If>

                <If condition={variation.type.toLowerCase() === 'texture'}>
                  <Then>
                    <ul className='grid grid-cols-2 gap-4 mb-4'>
                      {variation.options.map((option) => {
                        const data = option.split('#');
                        return (
                          <li
                            key={option}
                            className='flex items-center relative'>
                            <input className='block w-6 h-6' type='checkbox' />
                            <span className='block ml-1 text-sm'>
                              {data[0]}
                            </span>
                            <div className='absolute right-0'>
                              <Image
                                src={`/images/${data[1]}`}
                                alt={data[0]}
                                width={35}
                                height={35}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </Then>
                </If>
              </div>
            );
          })}
        </Then>
      </If>

      <BottomNav links={bottomLinks} />
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

  const { id: cat_id, sub_id, product_id } = context.query;
  const rawData = [
    ...accesories.accesories,
    ...furnitures.furnitures,
    ...materials.materials,
    ...others.others,
  ];

  const data = rawData.find(
    (d) => d.category_id == cat_id && d.sub_category_id == sub_id,
  );

  if (!data) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const product = (data.products as any).find((p) => p.id == product_id);

  if (!product) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, product },
  };
}
