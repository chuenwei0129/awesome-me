import { ArrowUpRight, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import React from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * ------------------------------------------
 * Core concept: Technical Data Grid.
 * - Container: Uses CSS Multi-column layout for true masonry flow.
 * - Cards: Sharp borders (border-slate-300), no radius, no shadows.
 * - Typography: Mono for IDs, Sans for content.
 */

// --- Types ---
type CardType = 'text' | 'image';

interface MasonryItem {
  id: string | number;
  type: CardType;
  title?: string;
  description?: string;
  imageUrl?: string;
  heightClass?: string; // Simulating different heights for the demo
}

// --- Components ---

interface BlueprintCardProps {
  item: MasonryItem;
}

const BlueprintCard: React.FC<BlueprintCardProps> = ({ item }) => {
  return (
    <div className="break-inside-avoid mb-6 bg-white border border-slate-300 hover:border-slate-900 transition-colors duration-200 group relative">
      {/* Technical Header / ID Label */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-slate-200 bg-slate-50/50">
        <span className="font-mono text-xs text-slate-500">#{item.id}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={14} className="text-slate-900" />
        </div>
      </div>

      {/* Image Content */}
      {item.type === 'image' && item.imageUrl && (
        <div className="relative border-b border-slate-300 bg-slate-100">
          <img
            src={item.imageUrl}
            alt={item.title || 'Blueprint Asset'}
            className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
          />
          {/* Engineering Overlay Icon */}
          <div className="absolute top-2 right-2 bg-white border border-slate-300 p-1">
            <ImageIcon size={12} className="text-slate-900" />
          </div>
        </div>
      )}

      {/* Text Body */}
      <div className={`p-4 ${item.heightClass || ''}`}>
        {item.title && (
          <h3 className="font-sans font-bold text-slate-900 text-base mb-1">
            {item.title}
          </h3>
        )}

        {item.description ? (
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>
        ) : (
          /* Placeholder lines for "text-only" cards to visually simulate content */
          <div className="space-y-2 mt-1">
            <div className="h-2 w-3/4 bg-slate-100" />
            <div className="h-2 w-1/2 bg-slate-100" />
          </div>
        )}
      </div>

      {/* Footer / Meta (Optional) */}
      <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-slate-300"></div>
          <div className="w-2 h-2 bg-slate-300"></div>
        </div>
        <MoreHorizontal size={14} className="text-slate-400" />
      </div>
    </div>
  );
};

interface WaterfallLayoutProps {
  items: MasonryItem[];
}

const WaterfallLayout: React.FC<WaterfallLayoutProps> = ({ items }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-[#f8fafc] min-h-screen font-sans">
      {/* Header Section */}
      <header className="mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">
          Grid System{' '}
          <span className="text-slate-400 font-light">/ WTR-FL</span>
        </h1>
        <div className="flex justify-between items-end mt-2">
          <p className="text-slate-500 font-mono text-sm">
            LAYOUT_MODE: MASONRY_COLUMNS
          </p>
          <div className="text-xs font-mono bg-slate-900 text-white px-2 py-1">
            ITEMS: {items.length}
          </div>
        </div>
      </header>

      {/* 
        Masonry Container 
        - columns-1 (mobile) -> columns-2 (tablet) -> columns-3 (desktop) -> columns-4 (xl)
        - gap-6: Spacing between columns
      */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <BlueprintCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- Data Simulation (Matching your image structure) ---

const sampleData: MasonryItem[] = [
  { id: '001', type: 'text', heightClass: 'h-32' }, // Tall card 1
  { id: '002', type: 'text', heightClass: 'h-16' }, // Short card 2
  { id: '003', type: 'text', heightClass: 'h-24' },
  { id: '004', type: 'text', heightClass: 'h-20' },
  {
    id: 'SPECIAL',
    type: 'image',
    title: "I'm Special",
    description:
      "Let's have a meal. Standardized caloric intake unit visualization.",
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', // Food image similar to reference
  },
  { id: '006', type: 'text', heightClass: 'h-40' },
  { id: '007', type: 'text', heightClass: 'h-24' },
  { id: '008', type: 'text', heightClass: 'h-16' },
  { id: '009', type: 'text', heightClass: 'h-12' },
  { id: '010', type: 'text', heightClass: 'h-28' },
  { id: '011', type: 'text', heightClass: 'h-32' },
  { id: '012', type: 'text', heightClass: 'h-48' }, // Very tall
  { id: '013', type: 'text', heightClass: 'h-16' },
  { id: '014', type: 'text', heightClass: 'h-20' },
  { id: '015', type: 'text', heightClass: 'h-32' },
];

// --- Export ---
export default function WaterfallDemo() {
  return <WaterfallLayout items={sampleData} />;
}
