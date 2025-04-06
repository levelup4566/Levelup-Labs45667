
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';

/**
 * RouterHeader Component - Handles navigation by intercepting DOM events
 * 
 * Functionality:
 * - Intercepts clicks on anchor tags that should use React Router
 * - Prevents default browser navigation for internal links
 * - Uses History API to trigger React Router navigation without page refresh
 * - Provides error handling to ensure navigation reliability
 */
const RouterHeader = () => {
  const location = useLocation();
  
  useEffect(() => {
    /**
     * Handle anchor tag clicks for SPA navigation
     * @param {MouseEvent} e - The click event
     */
    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        
        // Skip processing if not an anchor or if it's an external link
        if (!anchor) return;
        
        // Skip router handling for links that should use default behavior
        if (!isInternalRouterLink(anchor)) return;
        
        e.preventDefault();
        const href = anchor.getAttribute('href');
        
        // Navigate only if href is valid and different from current page
        if (href && window.location.pathname !== href) {
          // Use History API for navigation
          window.history.pushState({}, '', href);
          // Dispatch event to trigger React Router navigation
          window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to default navigation behavior if our handler fails
        return true;
      }
    };

    /**
     * Determines if a link should use React Router navigation
     * @param {HTMLAnchorElement} anchor - The anchor element to check
     * @returns {boolean} - Whether the link should use React Router
     */
    const isInternalRouterLink = (anchor: HTMLAnchorElement): boolean => {
      const href = anchor.getAttribute('href');
      
      // Skip router handling in these cases
      return !!(href && 
                href.startsWith('/') && 
                !anchor.getAttribute('target') &&
                !anchor.hasAttribute('data-prevent-router'));
    };

    document.addEventListener('click', handleClick);
    
    // Cleanup listener on component unmount
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <Header />;
};

export default RouterHeader;
