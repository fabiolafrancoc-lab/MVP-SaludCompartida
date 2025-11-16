
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Volver should scroll to top of the current page.
// If you later need navigation as well, pass a prop to enable it.
const TopNav = ({ logoSrc = '/saludcompartida logo WT.png', logoAlt = 'SaludCompartida', onBack, hideUser = false }) => {
  const { currentUser } = useContext(UserContext);

  // prefixed with underscore because it may be unused in some pages — keeps lint happy
  const _handleBack = () => {
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If a caller provided an onBack callback (for example to change App state), call it.
    if (typeof onBack === 'function') {
      try {
        onBack();
      } catch (err) {
        // swallow errors from user-provided callbacks to avoid breaking the header
        console.error('TopNav onBack callback error:', err);
      }
    }
    // Intentionally do not navigate away by default so "Volver" always brings user to the top of the page.
    // If you still want to perform navigation after scrolling, call `onBack` from the caller directly.
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt={logoAlt} className="h-12 object-contain" />
        </div>
        
        <div className="flex items-center gap-4">
          {!hideUser && currentUser && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-pink-50 px-4 py-2 rounded-full border border-cyan-200">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-lg font-semibold text-gray-700">
                {currentUser.firstName} {currentUser.lastName}
              </span>
            </div>
          )}
          
          {onBack && (
            <button
              onClick={_handleBack}
              className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"
            >
              Volver
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
