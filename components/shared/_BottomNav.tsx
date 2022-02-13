import Image from 'next/image';
import Link from 'next/link';

type Props = {
  links: {
    title: string;
    image: StaticImageData;
    href: string;
  }[];
};

export default function BottomNav({ links }: Props) {
  return (
    <ul className='absolute bottom-0 left-0 bg-primary w-full grid grid-cols-3 gap-x-2'>
      {links.map((link, idx) => (
        <li className='flex justify-center py-1' key={idx}>
          <Link href={link.href} passHref={true}>
            <div>
              <Image
                width={60}
                className='object-contain'
                height={60}
                src={link.image}
                alt={link.title}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
