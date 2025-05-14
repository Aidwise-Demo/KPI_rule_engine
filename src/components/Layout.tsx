
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">KPI Rules Engine</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    to="/" 
                    className="px-3 py-2 rounded hover:bg-primary-foreground/10 transition-colors"
                  >
                    Rules
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className="px-3 py-2 rounded hover:bg-primary-foreground/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KPI Rules Engine
        </div>
      </footer>
    </div>
  );
};

export default Layout;
