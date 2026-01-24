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
