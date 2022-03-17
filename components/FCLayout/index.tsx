import { useEffect, useState } from 'react';

// components
import { FCNavbar } from './FCNavbar';
import { FCFooter } from './FCFooter';
import FCSpinner from '../FCSpinner';

export default function FCLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(loadHomePage, 1000);
  }, []);

  const loadHomePage = () => {
    setLoading(false);
  };

  return (
    <>
      <div className='body'>
        {loading ? (
          <FCSpinner />
        ) : (
          <>
            <FCNavbar />
            <main>{children}</main>
            <FCFooter />
          </>
        )}
      </div>
    </>
  );
}
