import React from 'react'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Eye } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Transition from '@/components/transition'
import { keys } from '@/lib/constants'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Workpage' })
  return {
    title: t('metadatatitle'),
    description: t('metadatadescription'),
  }
}

export default function Work({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Workpage')

  return (
    <Transition>
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">{t('title')}</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {keys.map((key, id) => {
          return (
            <div
              className="rounded-base border-2 border-border bg-main p-4 shadow-light dark:border-darkBorder dark:bg-darkMain dark:shadow-dark sm:p-5"
              key={id}
            >
              <AspectRatio
                className="relative !-bottom-[2px] overflow-hidden rounded-base border-2 border-border bg-black shadow-light dark:border-darkBorder dark:shadow-dark"
                ratio={71 / 50}
              >
                <Image
                  className="relative w-full rounded-base hover:bg-white/30"
                  src={t(`${key}.previewImage`)}
                  alt={t(`${key}.name`)}
                  width={710}
                  height={500}
                  quality={100}
                />
                <Dialog>
                  <DialogTrigger className="absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent hover:bg-white/20" />
                  <DialogContent
                    className="mx-auto border-none bg-transparent sm:max-w-[710px]"
                    showCloseButton={false}
                  >
                    <Carousel startIndex={id} className="mx-8">
                      <CarouselContent className="overflow-visible">
                        {keys.map((key, index) => {
                          return (
                            <CarouselItem
                              key={index}
                              className="pb-8 sm:w-full"
                            >
                              <>
                                <Image
                                  className="rounded-base"
                                  src={t(`${key}.previewImage`)}
                                  alt={t(`${key}.name`)}
                                  width={710}
                                  height={500}
                                  quality={100}
                                />
                                <div className="absolute bottom-0 z-50 flex w-[95%] justify-between md:w-[97%]">
                                  <Link
                                    href={t(`${key}.liveLink`)}
                                    aria-label="Open website in a new window"
                                    target="_blank"
                                    className="flex items-center justify-center gap-1 whitespace-nowrap text-sm text-white underline md:text-base"
                                  >
                                    <span>{t('link')}</span>
                                    <ExternalLink className="h-5 w-5" />
                                  </Link>
                                  <Link
                                    href={`/${locale}/work/` + t(`${key}.slug`)}
                                    aria-label="See details project"
                                    className="bottom-0 flex items-center justify-center gap-1 whitespace-nowrap text-sm text-white underline md:text-base"
                                  >
                                    <span>{t('details')}</span>
                                    <Eye className="h-5 w-5" />
                                  </Link>
                                </div>
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

              <div className="mt-5 flex items-end justify-between gap-4 font-base text-text dark:text-darkText">
                <div className="max-w-[80%]">
                  <h2 className="h-auto text-xl font-heading sm:text-2xl md:h-16 lg:h-auto">
                    {t(`${key}.name`)}
                  </h2>

                  <p className="mt-1 flex h-16 items-end">
                    {t(`${key}.description`)}
                  </p>
                </div>
                <Link
                  aria-label="See details project"
                  href={`/${locale}/work/` + t(`${key}.slug`)}
                  className="h-fit cursor-pointer rounded-base border-2 border-border bg-bg px-4 py-2 text-center text-sm font-base shadow-light transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:text-darkText dark:shadow-dark dark:hover:shadow-none sm:text-base"
                >
                  <Eye />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Transition>
  )
}
