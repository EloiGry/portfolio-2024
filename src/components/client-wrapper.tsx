'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/ui/loader';

type Props = {
  children: React.ReactNode;
};

const ClientWrapper = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si le contenu est déjà chargé
    const handleLoad = () => {
      setLoading(false);
    };

    // L'événement load peut ne pas se déclencher sur les navigations internes
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading ? <Loader /> : children}
    </AnimatePresence>
  );
};

export default ClientWrapper;
