import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

import Image from 'next/image'
import Link from 'next/link'
import { keys } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { BackButton } from '@/components/back-button'
import { Button } from '@/components/ui/button'

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Workpage' })
  return keys.map((key: string) => ({
    slug: t(`${key}.slug`),
  }))
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Workpage' })
  const project = keys.find((key: string) => t(`${key}.slug`) === slug)
  return {
    title: t(`${project}.name`),
    description: t(`${project}.description`),
  }
}

export default function DetailsWork({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Workpage')

  const project = keys.find((key: string) => t(`${key}.slug`) === slug)
  const data = t.raw(project)

  return (
    <div className="container relative flex flex-col items-center gap-12 fade-in">
      <BackButton className="md-top-10 absolute -top-6 left-0" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-heading sm:text-4xl">
          {t(`${project}.name`)}
        </h1>
        <Image
          className="relative w-full max-w-[710px] rounded-base"
          src={data.previewImage}
          alt={data.name}
          layout="responsive"
          width={710}
          height={500}
          quality={100}
        />
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag: string, index: number) => {
            return <Badge key={index}>{tag}</Badge>
          })}
        </div>
      </div>
      <p>{data.long_description}</p>
      <Carousel>
        <CarouselContent>
          {data.galery.map((img: string, index: number) => {
            return (
              <CarouselItem
                key={index}
                className="basis-1/1 w-full md:basis-1/2 lg:basis-1/3"
              >
                <Image
                  src={img}
                  alt={data.name}
                  width={300}
                  height={200}
                  className="w-full px-2"
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-8 md:-left-12" />
        <CarouselNext className="-right-8 md:-right-12" />
      </Carousel>
      <div className="flex gap-4">
        <Button>
          <Link href={data.liveLink} target="_blank">
            {t('link')}
          </Link>
        </Button>
        <Button>
          <Link href={`/${locale}/work`}>{t('otherWorks')}</Link>
        </Button>
      </div>
    </div>
  )
}
