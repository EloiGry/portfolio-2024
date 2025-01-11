import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import Image from 'next/image';

import Links from '@/components/links';
import { ContactForm } from "@/components/sections/contact-form";
import { ContactForm as ContactType } from "@/types/contactForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SiGmail } from "@icons-pack/react-simple-icons";
import { CvBlock } from "@/components/sections/cv-block";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Homepage' });
  return {
    title: t('metadatatitle'),
    description: t('metadatadescription')
  };
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Homepage');
  const t_bis = useTranslations('Contact')

  const formData: ContactType = {
    title: t_bis('title'),
    description: t_bis('description'),
    name: t_bis('name'),
    email: t_bis('email'),
    object: t_bis('object'),
    message: t_bis('message'),
    errors_name: t_bis('errors_name'),
    errors_email: t_bis('errors_email'),
    errors_object: t_bis('errors_object'),
    errors_message: t_bis('errors_message'),
    global_error: t_bis('global_error'),
    submit: t_bis('submit'),
    success_message: t_bis('success_message')
  };

  return (
    <div className='fade-in flex items-center my-auto min-h-full'>
      <div className='md:w-1/2'>
        <h1 className="text-2xl font-heading sm:text-4xl">{t('title')}</h1>
        <p className="mt-2 text-lg sm:text-xl">{t('subtitle')}</p>
        <div className="mt-8 text-base sm:text-lg">
          <p>{t('description')}</p>
          <br />
          <p>{t('subdescription')}</p>
        </div>
        <div className="flex mt-20 gap-10 items-center">
          <CvBlock/>
          <Dialog>
            <DialogTrigger asChild>
              <button><SiGmail/></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-bg dark:bg-darkBg">
              <ContactForm formData={formData}/>
            </DialogContent>
          </Dialog>
          <Links />
        </div>
      </div>
      <div className='hidden md:flex md:w-1/2 justify-center'>
        <Image src='/main.svg' alt="main image" width={400} height={400} />
      </div>
    </div> 
  );
}
