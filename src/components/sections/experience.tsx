import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Experience({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Aboutpage');
  const keys = ['experience_1'] as const;
  return (
    <div className="mb-16">
      <h2 className="mb-8 text-xl font-heading sm:text-2xl">Experience</h2>
      {keys.map((key, id) => {
        return (
          <div className="mb-8" key={id}>
            <h3 className="text-lg font-heading sm:text-xl">
              {t(`${key}.role`)} @ {t(`${key}.company`)}
            </h3>

            <p className="mb-4 mt-0.5 text-sm">
              {t(`${key}.startDate`)} - {t(`${key}.endDate`)}
            </p>
            <p>{t(`${key}.description`)}</p>
          </div>
        )
      })}
    </div>
  )
}
