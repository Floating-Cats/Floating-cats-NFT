// components/layout.js

import { FCNavbar } from '../FCNavbar';
import { FCFooter } from '../FCFooter';

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <FCNavbar />
      <>{children}</>
      <FCFooter />
    </>
  );
}
