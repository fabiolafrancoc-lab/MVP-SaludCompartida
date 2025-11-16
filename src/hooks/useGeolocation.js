import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState({
    country: null,
    countryCode: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check if we already have cached location
    const cached = localStorage.getItem('userLocation');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Cache for 24 hours
        const cacheTime = 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.timestamp < cacheTime) {
          setLocation({
            country: parsed.country,
            countryCode: parsed.countryCode,
            loading: false,
            error: null
          });
          return;
        }
      } catch (e) {
        // Invalid cache, continue with API call
      }
    }

    // Fetch location from API
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const locationData = {
          country: data.country_name,
          countryCode: data.country_code,
          timestamp: Date.now()
        };

        // Cache the result
        localStorage.setItem('userLocation', JSON.stringify(locationData));

        setLocation({
          country: data.country_name,
          countryCode: data.country_code,
          loading: false,
          error: null
        });
      })
      .catch(error => {
        console.error('Geolocation error:', error);
        setLocation({
          country: null,
          countryCode: null,
          loading: false,
          error: 'Failed to detect location'
        });
      });
  }, []);

  return location;
}

// Helper function to determine if user is in USA
export function isUSAUser(countryCode) {
  return countryCode === 'US';
}

// Helper function to determine if user is in Mexico
export function isMexicoUser(countryCode) {
  return countryCode === 'MX';
}
