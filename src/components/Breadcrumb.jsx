import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <div className="bg-dark-900 py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            to="/"
            className="flex items-center text-dark-400 transition-colors hover:text-primary-500"
          >
            <Home className="h-4 w-4" />
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

            return (
              <div key={name} className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 text-dark-600" />
                {isLast ? (
                  <span className="text-primary-500">{displayName}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-dark-400 transition-colors hover:text-primary-500"
                  >
                    {displayName}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
