import Image from 'next/image';
import logo from '../../assets/images/logo-small.png';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
};

export default function Navbar({ title }: Props) {
  const router = useRouter();

  return (
    <nav className='flex justify-between bg-primary items-center px-2'>
      <div className='flex text-white items-center'>
        <ChevronLeftIcon
          onClick={() => router.back()}
          className='w-6 h-6 mr-2'></ChevronLeftIcon>
        <span className='text-xl font-semibold'>{title}</span>
      </div>

      <div>
        <Image src={logo} alt='logo' width={55} height={50}></Image>
      </div>
    </nav>
  );
}
