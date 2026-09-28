import React, { useState } from 'react';
import { Item, Category } from '../types';
import { getItemImage } from '../lib/images';
import { Smartphone, FileText, Watch, BookOpen, ShoppingBag, Box } from 'lucide-react';

interface ItemThumbProps {
  item: Item;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

function CategoryIcon({ category, className = 'w-6 h-6' }: { category: Category; className?: string }) {
  switch (category) {
    case 'Electronics':
      return <Smartphone className={className} />;
    case 'Documents':
      return <FileText className={className} />;
    case 'Accessories':
      return <Watch className={className} />;
    case 'Books':
      return <BookOpen className={className} />;
    case 'Bags':
      return <ShoppingBag className={className} />;
    case 'Other':
    default:
      return <Box className={className} />;
  }
}

export const ItemThumb: React.FC<ItemThumbProps> = ({ item, className = '', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getItemImage(item);

  const sizeClasses = {
    sm: 'w-16 h-16 rounded-xl',
    md: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl',
    lg: 'w-full h-48 sm:h-64 rounded-2xl',
    hero: 'w-full max-h-[380px] aspect-square rounded-3xl',
  }[size];

  if (imageError || !imageUrl) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-50 to-indigo-100/70 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0 shadow-inner ${sizeClasses} ${className}`}
      >
        <CategoryIcon category={item.category} className={size === 'hero' ? 'w-16 h-16' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7'} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#F3F7FD] flex items-center justify-center shrink-0 border border-slate-100/80 shadow-xs ${sizeClasses} ${className}`}>
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
};
