import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
