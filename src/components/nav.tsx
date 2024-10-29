'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { ThemeSwitcher } from './theme-switcher';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations('Header');
  const [activeIndex, setActiveIndex] = useState(0);
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const links = [
    { path: '', text: t('home') },
    { path: '/about', text: t('about') },
    { path: '/work', text: t('work') },
  ];

  const updateBorderPosition = () => {
    if (navRef.current) {
      const activeLink = navRef.current.children[activeIndex] as HTMLElement;
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      setBorderPosition({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  };

  useEffect(() => {
    const currentLinkIndex = links.findIndex(link => path === `/${locale}${link.path}`);
    if (currentLinkIndex !== -1) {
      setActiveIndex(currentLinkIndex);
    }
  }, [path, locale]);

  useEffect(() => {
    updateBorderPosition();
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateBorderPosition();
    };

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex]);

  const changeLocale = (newLocale: 'en' | 'es' | 'fr') => {
    const pathWithoutLocale = path.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="fixed left-0 top-5 z-50 w-full flex">
      <nav ref={navRef} className="relative text-text border-border dark:border-darkBorder shadow-light dark:shadow-dark mx-auto flex items-center w-max gap-2.5 sm:gap-5 rounded-base border-2 bg-main dark:bg-darkMain p-2.5 px-5 text-xs font-base sm:text-base w450:gap-4">
        {links.map((link, index) => {
          return (
            <Link
              prefetch={true}
              key={link.path}
              className={clsx(
                'relative rounded-base transition-colors pl-2 pr-1.5 py-1'
              )}
              href={`/${locale}${link.path}`}
              onClick={() => setActiveIndex(index)}
            >
              {link.text}
            </Link>
          );
        })}
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 border-2 my-2 border-border rounded-base"
          animate={borderPosition}
          transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
          style={{
            left: borderPosition.left,
            width: borderPosition.width,
          }}
        />
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger className="m500:h-4 m500:w-4 h-6 w-6">{getFlagByLocale(locale)}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('es')}>
              <img src='/spain.svg' className="m500:h-4 m500:w-4 h-6 w-6" alt='spain' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('en')}>
              <img src='/united-states.svg' className="m500:h-4 m500:w-4 h-6 w-6" alt='united-state'/>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('fr')}>
              <img src='/franceflag.svg' className="m500:h-4 m500:w-4 h-6 w-6" alt='france'/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      {/* <div className='fixed bottom-0 right-0 p-5'>
        <DropdownMenu>
          <DropdownMenuTrigger>{getFlagByLocale(locale)}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('es')}>
              <img src='/spain.svg' alt='spain' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('en')}>
              <img src='/united-states.svg' alt='united-state'/>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-center' onClick={() => changeLocale('fr')}>
              <img src='/franceflag.svg' alt='france'/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </div>
  );
}

function getFlagByLocale(locale: string) {
  switch (locale) {
    case 'es':
      return <img src='/spain.svg' alt='Spain flag' />;
    case 'en':
      return <img src='/united-states.svg' alt='US flag' />;
    case 'fr':
      return <img src='/franceflag.svg' alt='France flag' />;
    default:
      return <img src='' alt='Default' />;
  }
}
