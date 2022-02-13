import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/shared/_layout';
import dummy from '../../data/categories.json';
import { Category } from '../../models/Category';
import { SubCategory } from '../../models/SubCategory';

export default function SubCategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const categories: Category[] = dummy.categories;
  const category: Category = categories.find((c) => c.id == id);

  if (!category) {
    router.push('/home');
  }

  return (
    <Layout title={category.title}>
      <ul className='grid grid-cols-2 gap-x-8 gap-y-16 px-2 py-8'>
        {category.sub_categories.map((cat) => (
          <li className='cursor-pointer' key={cat.id}>
            <Link href='/home' passHref={true}>
              <div className='flex flex-col justify-center'>
                <Image
                  width={125}
                  height={110}
                  src={`/images/${cat.image}`}
                  alt={cat.title}
                />
                <span className='block text-center font-semibold text-xl'>
                  {cat.title}
                </span>
              </div>
            </Link>
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
  return {
    props: { session },
  };
}
