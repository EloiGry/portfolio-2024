import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'


export default function About({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
    const t = useTranslations('Aboutpage');
  return (
    <div className="fade-in">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">{t('title')}</h1>

      <div className="mb-10 text-base sm:text-lg">
        <p>
        {t('description')}
        </p>
      </div>

      <Skills />

      <Experience locale={locale}/>
    </div>
  )
}