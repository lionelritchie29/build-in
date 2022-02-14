import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import useWindowSize from '../../hooks/UseWindowSize';

type Props = {
  links: {
    title: string;
    image?: StaticImageData;
    href: string;
    text?: string;
  }[];
};

const centerFixed = {
  left: '50%',
  marginLeft: '-14rem',
};

export default function BottomNav({ links }: Props) {
  const size = useWindowSize();

  return (
    <ul
      style={size.width > 448 ? centerFixed : {}}
      className={classNames(
        'fixed mx-auto bottom-0 bg-primary w-full grid grid-cols-3 gap-x-2 divide-x divide-gray-500',
        { 'max-w-md': size.width > 448 },
        { 'left-0': size.width <= 448 },
      )}>
      {links.map((link, idx) => (
        <li
          className='cursor pointer flex items-center justify-center'
          key={idx}>
          <Link href={link.href} passHref={true}>
            <div className='cursor-pointer'>
              {link.image ? (
                <Image
                  width={50}
                  className='object-contain'
                  height={50}
                  src={link.image}
                  alt={link.title}
                />
              ) : (
                <span className='block text-white text-xl font-semibold'>
                  {link.text}
                </span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
