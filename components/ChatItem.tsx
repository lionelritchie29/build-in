import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  isCustomer: boolean;
  text: string;
};

export default function ChatComponent({ isCustomer, text }: Props) {
  return (
    <div className={classNames('flex', { 'justify-end': isCustomer })}>
      {!isCustomer && (
        <div>
          <Image src='/images/cs.jpg' alt='' width={35} height={40} />
        </div>
      )}
      <div
        style={{ background: isCustomer ? '#ecefef' : '#61c1c4' }}
        className='border border-gray-300 text-center rounded-full w-2/3 px-2 py-3 flex items-center justify-center ml-4'>
        {text}
      </div>
    </div>
  );
}
