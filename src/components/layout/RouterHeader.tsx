
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';

const RouterHeader = () => {
  const location = useLocation();
  
  // This component intercepts DOM events and prevents navigation via <a> tags
  // Instead, it uses React Router's programmatic navigation
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && 
          anchor.getAttribute('href')?.startsWith('/') && 
          !anchor.getAttribute('target') &&
          !anchor.hasAttribute('data-prevent-router')) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && window.location.pathname !== href) {
          window.history.pushState({}, '', href);
          // Dispatch a popstate event to trigger React Router navigation
          window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <Header />;
};

export default RouterHeader;
