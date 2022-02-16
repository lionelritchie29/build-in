import { getSession } from 'next-auth/react';
import architecture_portfolios from '../../../../../../../data/architecture_portfolios.json';
import interior_portfolios from '../../../../../../../data/interior_portfolios.json';
import categories from '../../../../../../../data/categories.json';
import Layout from '../../../../../../../components/shared/_layout';
import Image from 'next/image';
import { Case, Default, If, Switch, Then } from 'react-if';
import cartIcon from '../../../../../../../public/images/cart.png';
import chatIcon from '../../../../../../../public/images/chat.png';
import {
  capitalizeFirstLetter,
  formatter,
} from '../../../../../../../lib/helper';
import BottomNav from '../../../../../../../components/shared/_BottomNav';
import { useRouter } from 'next/router';
import { CartService } from '../../../../../../../services/CartService';
import { toast } from 'react-toastify';

export default function PortfolioDetailPage({ project, subCategory }) {
  const router = useRouter();
  const { id: catId, sub_id, project_id } = router.query;

  const canDisplay = (key: string): boolean => {
    if (
      key.toLowerCase() === 'id' ||
      key.toLowerCase() === 'name' ||
      key.toLowerCase() === 'image'
    )
      return false;
    return true;
  };

  const mapKeyToHeader = (key: string): string => {
    switch (key.toLowerCase()) {
      case 'architect':
        return 'Nama Arsitek';
      case 'area':
        return 'Luas/Meter';
      case 'period':
        return 'Periode';
      case 'project_name':
        return 'Nama Project';
      case 'location':
        return 'Lokasi';
      case 'lb_lt':
        return 'LB_LT';
      case 'facilities':
        return 'Fasilitas';
      default:
        return key;
    }
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
        const categoryId = catId as string;
        const subId = sub_id as string;
        const prodId = project_id as string;
        CartService.add(
          categoryId,
          subId,
          prodId,
          project.image,
          project.harga,
          project.name,
          project.architect,
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
          alt={project.name}
          width={400}
          height={300}
          className='object-contain rounded'
        />
        <h1 className='text-2xl font-semibold'>{project.name}</h1>

        <ul className='mt-3 space-y-1'>
          {Object.keys(project).map((key, idx) => {
            return (
              <li key={key}>
                <If condition={canDisplay(key)}>
                  <Then>
                    <Switch>
                      <Case condition={key.toLowerCase() === 'header'}>
                        <span className='block font-medium'>
                          {project[key]}
                        </span>
                      </Case>
                      <Case condition={key.toLowerCase() === 'facilities'}>
                        <div className='flex flex-col'>
                          <span className='block font-medium'>
                            {capitalizeFirstLetter(mapKeyToHeader(key))}:
                          </span>
                          <span className='block'>{project[key]}</span>
                        </div>
                      </Case>
                      <Case
                        condition={
                          key.toLowerCase() === 'architect' &&
                          subCategory.type.includes('interior')
                        }>
                        <span className='block font-medium'>
                          {project[key]}
                        </span>
                      </Case>
                      <Case condition={key.toLowerCase() === 'harga'}>
                        <div className='flex'>
                          <span className='block font-medium'>
                            {capitalizeFirstLetter(mapKeyToHeader(key))}:
                          </span>
                          <span className='block ml-1'>
                            {formatter.format(project[key])}
                          </span>
                        </div>
                      </Case>
                      <Default>
                        <div className='flex'>
                          <span className='block font-medium'>
                            {capitalizeFirstLetter(mapKeyToHeader(key))}:
                          </span>
                          <span className='block ml-1'>{project[key]}</span>
                        </div>
                      </Default>
                    </Switch>
                  </Then>
                </If>
              </li>
            );
          })}
        </ul>
      </div>

      <BottomNav links={bottomLinks} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const { id: catId, sub_id, type, project_id } = context.query;
  const rawData = [
    ...architecture_portfolios.portfolios,
    ...interior_portfolios.portfolios,
  ];

  const data = rawData.find((d) => d.type == type);
  const project = (data.projects as any).find((p) => p.id == project_id);

  const subCategory = categories.categories
    .find((c) => c.id == catId)
    .sub_categories.find((s) => s.id == sub_id);

  if (!data) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, project, subCategory },
  };
}
