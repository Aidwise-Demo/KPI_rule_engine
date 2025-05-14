
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <h1 className="text-xl font-bold">KPI Rules Engine</h1>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    to="/" 
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md transition-all",
                      location.pathname === "/" ? 
                        "bg-primary-foreground/20 font-medium" : 
                        "hover:bg-primary-foreground/10"
                    )}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Rules
                    {location.pathname === "/" && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-400" />
                    )}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md transition-all",
                      location.pathname === "/dashboard" ? 
                        "bg-primary-foreground/20 font-medium" : 
                        "hover:bg-primary-foreground/10"
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                    {location.pathname === "/dashboard" && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-400" />
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className={cn("flex-1 bg-slate-50", className)}>
        {children}
      </main>
      
      <footer className="py-4 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KPI Rules Engine
        </div>
      </footer>
    </div>
  );
};

export default Layout;
