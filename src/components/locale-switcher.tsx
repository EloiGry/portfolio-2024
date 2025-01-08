import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

type Locale = 'es' | 'en' | 'fr';

type LocaleSwitcherProps = {
    locale: string;
    path: string
}

export default function LocaleSwitcher({ locale, path }: LocaleSwitcherProps) {
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    const pathWithoutLocale = path.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-6 w-6">
        {getFlagByLocale(locale)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {['es', 'en', 'fr'].map((lang) => (
          <DropdownMenuItem
            key={lang}
            className="flex justify-center"
            onClick={() => changeLocale(lang)}
          >
            <img src={`/${lang === 'es' ? 'spain' : lang === 'en' ? 'united-states' : 'franceflag'}.svg`} alt={`${lang} flag`} className="h-6 w-6" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getFlagByLocale(locale: string): JSX.Element {
    const flags: Record<Locale, string> = {
      es: '/spain.svg',
      en: '/united-states.svg',
      fr: '/franceflag.svg',
    };
  
    // Vérification pour s'assurer que 'locale' est l'une des valeurs autorisées
    if (locale === 'es' || locale === 'en' || locale === 'fr') {
      return <img src={flags[locale as Locale]} alt={`${locale} flag`} className="h-6 w-6" />;
    }
  
    // Si la valeur n'est pas valide, on retourne une image par défaut ou un autre fallback
    return <img src="/default-flag.svg" alt="default flag" className="h-6 w-6" />;
  }
