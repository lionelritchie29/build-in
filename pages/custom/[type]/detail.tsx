import { getSession } from 'next-auth/react';
import Layout from '../../../components/shared/_layout';
import { capitalizeFirstLetter } from '../../../lib/helper';
import Stepper from 'react-stepper-horizontal';
import { useState } from 'react';
import classNames from 'classnames';
import StepOne from '../../../components/custom-detail/StepOne';
import StepTwo from '../../../components/custom-detail/StepTwo';
import StepThree from '../../../components/custom-detail/StepThree';
import StepFour from '../../../components/custom-detail/StepFour';
import StepFive from '../../../components/custom-detail/StepFive';
import StepSix from '../../../components/custom-detail/StepSix';
import { Case, Switch } from 'react-if';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
};

export default function CustomDetailPage({ type }: Props) {
  const [steps, setSteps] = useState([
    {
      title: 'Proses Verifikasi',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(0);
      },
    },
    {
      title: 'Konsultasi',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(1);
      },
    },
    {
      title: 'Revisi 1',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(2);
      },
    },
    {
      title: 'Revisi 2',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(3);
      },
    },
    {
      title: 'Revisi 3',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(4);
      },
    },
    {
      title: 'Final',
      href: '/',
      onClick: (e) => {
        e.preventDefault();
        setActiveIdx(5);
      },
    },
  ]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout title={`Detail Custom ${capitalizeFirstLetter(type)}`}>
      <div>
        <Stepper
          activeColor='#2dbbba'
          completeColor='#184d4e'
          defaultColor='#184d4e'
          titleFontSize={14}
          steps={steps}
          activeStep={activeIdx}
        />
      </div>

      <Switch>
        <Case condition={activeIdx === 0}>
          <StepOne setActiveIdx={setActiveIdx} type={type} />
        </Case>
        <Case condition={activeIdx === 1}>
          <StepTwo setActiveIdx={setActiveIdx} type={type} />
        </Case>
        <Case condition={activeIdx === 2}>
          <StepThree setActiveIdx={setActiveIdx} type={type} />
        </Case>
        <Case condition={activeIdx === 3}>
          <StepFour setActiveIdx={setActiveIdx} type={type} />
        </Case>
        <Case condition={activeIdx === 4}>
          <StepFive setActiveIdx={setActiveIdx} type={type} />
        </Case>
        <Case condition={activeIdx === 5}>
          <StepSix setActiveIdx={setActiveIdx} type={type} />
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
