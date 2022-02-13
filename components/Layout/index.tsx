// components/layout.js

import { useEffect, useState } from 'react';
import { FCNavbar } from '../FCNavbar';
import { FCFooter } from '../FCFooter';
import MySpinner from '../MySpinner';

export default function Layout({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean | any>(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(loadHomePage, 1500);
  }, []);

  const loadHomePage = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <MySpinner />
      ) : (
        <>
          <FCNavbar />
          <>{children}</>
          <FCFooter />
        </>
      )}
    </>
  );
}
