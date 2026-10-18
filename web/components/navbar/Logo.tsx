import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';

export function Logo() {
  return (
    <Link
      href={ROUTES.HOME}
      aria-label="Content"
      className="group flex items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="relative flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden sm:h-52 sm:w-52">
        <Image
          src="/logo-256.png"
          alt="Content"
          width={208}
          height={208}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
          priority
        />
      </span>
    </Link>
  );
}