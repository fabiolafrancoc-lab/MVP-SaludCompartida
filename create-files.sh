#!/bin/bash

# Script para crear todos los archivos restantes del proyecto SaludCompartida

echo "🚀 Creando archivos del proyecto SaludCompartida..."

# Crear componentes
echo "📦 Creando componentes..."

# Footer.tsx
cat > src/components/Footer.tsx << 'EOF'
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
EOF

echo "✅ Footer.tsx creado"

# ServiceCard.tsx
cat > src/components/ServiceCard.tsx << 'EOF'
'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  color: 'cyan' | 'green' | 'magenta' | 'orange';
  href?: string;
  badge?: string;
}

export default function ServiceCard({ title, subtitle, icon, color, href, badge }: ServiceCardProps) {
  const colorClasses = {
    cyan: 'bg-sc-cyan-50 border-sc-cyan-200 hover:border-sc-cyan-400',
    green: 'bg-sc-green-50 border-sc-green-200 hover:border-sc-green-400',
    magenta: 'bg-sc-magenta-50 border-sc-magenta-200 hover:border-sc-magenta-400',
    orange: 'bg-sc-orange-50 border-sc-orange-200 hover:border-sc-orange-400',
  };

  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return <a href={href} className={`card-sc ${colorClasses[color]} cursor-pointer`}>{children}</a>;
    }
    return <div className={`card-sc ${colorClasses[color]}`}>{children}</div>;
  };

  return (
    <CardWrapper>
      {badge && <span className="absolute -top-2 -right-2 px-2 py-1 bg-sc-orange-500 text-white text-xs font-bold rounded-full">{badge}</span>}
      <div className="text-center">
        <div className="mx-auto mb-4">{icon}</div>
        <h3 className="font-bold text-sc-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </CardWrapper>
  );
}
EOF

echo "✅ ServiceCard.tsx creado"

# Crear librerías
echo "📚 Creando librerías..."

# utils.ts
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPhoneUSA(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return `+1 ${numbers}`;
  if (numbers.length <= 6) return `+1 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  return `+1 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
}

export function formatPhoneMX(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return `+52 ${numbers}`;
  if (numbers.length <= 6) return `+52 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  return `+52 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
EOF

echo "✅ utils.ts creado"

echo "🎉 Archivos esenciales creados. Ejecuta 'npm run dev' para probar."
