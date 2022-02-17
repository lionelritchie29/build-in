import { getSession } from 'next-auth/react';
import { Case, Switch } from 'react-if';
import CustomFurnitureForm from '../../../components/custom/CustomFurnitureForm';
import CustomArchitectureForm from '../../../components/custom/CustomArchitectureForm';
import Layout from '../../../components/shared/_layout';
import CustomInteriorForm from '../../../components/custom/CustomInteriorForm';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
};

export default function CustomPage({ type }: Props) {
  console.log(type);
  return (
    <Layout title='Custom'>
      <Switch>
        <Case condition={type === 'architecture'}>
          <CustomArchitectureForm />
        </Case>
        <Case condition={type === 'furniture'}>
          <CustomFurnitureForm />
        </Case>
        <Case condition={type === 'interior'}>
          <CustomInteriorForm />
        </Case>
      </Switch>
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

  const { type } = context.query;

  return {
    props: { session, type },
  };
}
