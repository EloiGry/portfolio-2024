'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {SiReaddotcv } from "@icons-pack/react-simple-icons";

export function CvBlock() {
  const pathname = usePathname();

  const locale = pathname.split('/')[1] as 'en' | 'fr' | 'es';

  const cvPaths: Record<'en' | 'fr' | 'es', string> = {
    en: '/cv/CV_Grychta_Eloi_en.pdf',
    fr: '/cv/CV_Grychta_Eloi_fr.pdf',
    es: '/cv/CV_Grychta_Eloi_es.pdf',
  };

  return (
      <Link href={cvPaths[locale]} target='_blank'>
          <SiReaddotcv/>
      </Link>
  );
};
