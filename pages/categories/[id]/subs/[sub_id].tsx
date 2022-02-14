import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/shared/_layout';
import accesories from '../../../../data/accesories.json';
import architectures from '../../../../data/architectures.json';
import furnitures from '../../../../data/furnitures.json';
import interiors from '../../../../data/interiors.json';
import materials from '../../../../data/materials.json';
import others from '../../../../data/others.json';
import categories from '../../../../data/categories.json';
import Image from 'next/image';
import Link from 'next/link';
import { formatter } from '../../../../lib/helper';
import { Else, If, Then } from 'react-if';
import classNames from 'classnames';

export default function ProductListPage({ data, category }) {
  console.log({ data, category });

  const renderPrice = (price: string | number) => {
    if (typeof price === 'string') {
      const prices = price.split('-');
      return `${formatter.format(parseInt(prices[0]))} - ${formatter.format(
        parseInt(prices[1]),
      )}`;
    } else {
      return formatter.format(price);
    }
  };

  return (
    <Layout
      title={
        category.sub_categories.find((c) => c.id == data.sub_category_id).title
      }>
      <ul className='grid grid-cols-1 gap-y-6 py-4'>
        {data.products.map((product) => (
          <li key={product.id} className='flex'>
            <div className='w-2/5'>
              <Image
                src={`/images/furniture/beds/2.jpg`}
                alt={product.name}
                width={400}
                height={275}
                className='object-cover rounded-lg'
              />
            </div>
            <div className='w-3/5 ml-2'>
              <h2 className='text-base font-semibold'>{product.name}</h2>
              <If condition={product.seller}>
                <Then>
                  <span className='block font-medium text-sm -mt-1 text-gray-500'>
                    {product.seller}
                  </span>
                </Then>
              </If>

              <If condition={product.price}>
                <Then>
                  <span className='block text-sm'>
                    {renderPrice(product.price)}
                  </span>
                </Then>
              </If>

              <If condition={product.creator}>
                <Then>
                  <div className='flex'>
                    <Image
                      src='https://i.pravatar.cc/150?img=59'
                      alt='Avatar'
                      width={25}
                      height={25}
                      className='object-cover rounded'
                    />
                    <span className='block ml-2 text-gray-500'>
                      {product.creator}
                    </span>
                  </div>
                </Then>
              </If>

              <button
                className={classNames(
                  'inline-flex mt-1 w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2',
                  { 'mt-2': !product.seller || product.creator },
                )}>
                <If condition={product.creator}>
                  <Then>
                    {/* Creator */}
                    <Link href='/'>View Portfolio</Link>
                  </Then>
                  <Else>
                    <Link href='/'>View Detail</Link>
                  </Else>
                </If>
              </button>
            </div>
          </li>
        ))}
      </ul>
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

  const { id: cat_id, sub_id } = context.query;
  const rawData = [
    ...accesories.accesories,
    ...architectures.architectures,
    ...furnitures.furnitures,
    ...interiors.interiors,
    ...materials.materials,
    ...others.others,
  ];

  const data = rawData.find(
    (d) => d.category_id == cat_id && d.sub_category_id == sub_id,
  );
  const category = categories.categories.find((cat) => cat.id == cat_id);

  return {
    props: { session, data, category },
  };
}
