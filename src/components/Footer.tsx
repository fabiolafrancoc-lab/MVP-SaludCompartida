'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ variant = 'full' }: { variant?: 'simple' | 'full' }) {
  const currentYear = new Date().getFullYear();

  if (variant === 'simple') {
    return (
      <footer className="py-6 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {currentYear} SaludCompartida</p>
          <span>+1 305 522 7150</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-sc-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">© {currentYear} SaludCompartida. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
