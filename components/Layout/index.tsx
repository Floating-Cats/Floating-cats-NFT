// components/layout.js

import { FCNavbar } from '../FCNavbar';
import { FCFooter } from '../FCFooter';

export default function Layout({ children }) {
  return (
    <>
      <FCNavbar />
      <main>{children}</main>
      <FCFooter />
    </>
  );
}
