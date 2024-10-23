import Links from '@/components/links'
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale,  getTranslations } from "next-intl/server";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Homepage'});
  return {
    title: t('metadatatitle'),
    description: t('metadatadescription')
  }
}


export default function Home({ params: { locale } }: { params: { locale: string } }) {
  
  unstable_setRequestLocale(locale);
  const t = useTranslations('Homepage')
  return (
    <div className='fade-in'>
      <div className='md:w-1/2'>
        <h1 className="text-2xl font-heading sm:text-4xl">{t('title')}</h1>
        <p className="mt-2 text-lg sm:text-xl">{t('subtitle')}</p>
        <div className="mt-8 text-base sm:text-lg">
          <p>{t('description')}</p>

          <br />

          <p>
          {t('subdescription')}
          </p>
        </div>
      </div>

      <Links />
    </div>
  )
}
