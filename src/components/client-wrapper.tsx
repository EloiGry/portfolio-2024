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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simuler un délai

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? <Loader /> : children}
    </AnimatePresence>
  );
};

export default ClientWrapper;