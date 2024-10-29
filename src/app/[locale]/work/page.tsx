import React from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScanEye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Transition from "@/components/transition";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { ExternalLink } from "lucide-react";





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
  const keys = ['project_1', 'project_2', 'project_3', 'project_4', 'project_5', 'project_6', 'project_7', 'project_8', 'project_9', 'project_10', 'project_11'] as const;

  return (
    <Transition>
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {keys.map((key, id) => {
          return (
            <div
              className="border-border dark:border-darkBorder shadow-light dark:shadow-dark rounded-base border-2 bg-main dark:bg-darkMain p-4 sm:p-5"
              key={id}
            > 
              <AspectRatio
                className="relative overflow-hidden bg-black border-border dark:border-darkBorder shadow-light dark:shadow-dark !-bottom-[2px] rounded-base border-2"
                ratio={71 / 50}
              >
                <Image
                  className="rounded-base w-full hover:bg-white/30 relative"
                  src={t(`${key}.previewImage`)}
                  alt={t(`${key}.name`)}
                  width={710}
                  height={500}
                  quality={100} // Garde la qualité élevée
                />
                <Dialog>
                    <DialogTrigger className='cursor-pointer absolute inset-0 w-full h-full border-none bg-transparent hover:bg-white/20'>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[710px] bg-transparent border-none mx-auto">
                      <Carousel startIndex={id} className="mx-8">
                      <CarouselContent className="overflow-visible">
                      {keys.map((key, index) => {
                        return (
                          <CarouselItem key={index} className="sm:w-full pb-8" >
                            <>
                            <Image
                              className="rounded-base"
                              src={t(`${key}.previewImage`)}
                              alt={t(`${key}.name`)}
                              width={710}
                              height={500}
                              quality={100} // Garde la qualité élevée
                            />
                            <Link href={t(`${key}.liveLink`)} target="_blank" className="fixed z-50 bottom-0 underline text-white flex justify-center items-center gap-1 whitespace-nowrap"> <span>{t('link')}</span> <ExternalLink className="w-5 h-5"/> </Link>
                            </>
                          </CarouselItem>
                        )
                      })}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                      </Carousel>
                    </DialogContent>
                  </Dialog>
              </AspectRatio>

              <div className="text-text dark:text-darkText mt-5 font-base flex justify-between items-end gap-4 ">
                <div className='max-w-[80%]'>
                <h2 className="text-xl font-heading sm:text-2xl h-auto md:h-16 lg:h-auto">
                {t(`${key}.name`)}
                </h2>

                <p className="h-16 flex items-end mt-1">{t(`${key}.description`)}</p>
                </div>
                  <Link
                   
                    href={t(`${key}.liveLink`)}
                    target="_blank"
                     className="h-fit border-border dark:border-darkBorder dark:bg-darkBg dark:text-darkText shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 bg-bg px-4 py-2 text-center text-sm font-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base dark:hover:shadow-none"
                  >
                     <ExternalLink /> 
                  </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Transition>
  )
}
