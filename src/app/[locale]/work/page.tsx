import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScanEye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Transition from "@/components/transition";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Workpage'});
    return {
      title: t('metadatatitle'),
      description: t('metadatadescription')
    }
}


export default function Work({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
    const t = useTranslations('Workpage');
    const keys = ['project_1', 'project_2', 'project_3', 'project_4', 'project_5'] as const;
  return (
    <Transition>
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {keys.map((key, id) => {
          return (
            <div
              className="border-border dark:border-darkBorder shadow-light dark:shadow-dark rounded-base border-2 bg-main p-4 sm:p-5"
              key={id}
            > 
              <AspectRatio
                className="relative overflow-hidden bg-black border-border dark:border-darkBorder shadow-light dark:shadow-dark !-bottom-[2px] rounded-base border-2"
                ratio={71 / 50}
              >
                <Image
                  className="rounded-base"
                  src={t(`${key}.previewImage`)}
                  alt={t(`${key}.name`)}
                  width={710}
                  height={500}
                  quality={100} // Garde la qualité élevée

                />
                <Link href={t(`${key}.liveLink`)}
                      target="_blank" 
                      className='cursor-pointer absolute inset-0 bg-black/30 z-10 hover:bg-black/0 transition-opacity duration-300'> 
                </Link>
              </AspectRatio>

              <div className="text-text mt-5 font-base flex justify-between items-end gap-4 ">
                <div className='max-w-[80%]'>
                <h2 className="text-xl font-heading sm:text-2xl">
                {t(`${key}.name`)}
                </h2>

                <p className="mt-2 h-16 flex items-end">{t(`${key}.description`)}</p>
                </div>
                  <Link
                   
                    href={t(`${key}.liveLink`)}
                    target="_blank"
                     className="h-fit border-border dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 bg-bg px-4 py-2 text-center text-sm font-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base dark:hover:shadow-none"
                  >
                     <ScanEye /> 
                  </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Transition>
  )
}
