import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'
import Transition from "@/components/transition";

export default function About({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
    const t = useTranslations('Aboutpage');
  return (
    <Transition>
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">{t('title')}</h1>

      <div className="mb-10 text-base sm:text-lg">
        <p>
        {t('description')}
        </p>
      </div>

      <Skills />

      <Experience locale={locale}/>
    </Transition>
  )
}
