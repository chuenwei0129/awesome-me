import { Image as ImageIcon, MoreHorizontal, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * ------------------------------------------
 * Update Log:
 * - Added 'onDelete' handler to cards.
 * - Added 'X' button in card header (Top-Right).
 * - Semantic Color: Red (#dc2626) used strictly for destructive actions.
 */

// --- Types ---
type CardType = 'text' | 'image';

interface MasonryItem {
  id: string | number;
  type: CardType;
  title?: string;
  description?: string;
  imageUrl?: string;
  heightClass?: string;
}

// --- Components ---

interface BlueprintCardProps {
  item: MasonryItem;
  onDelete: (id: string | number) => void;
}

const BlueprintCard: React.FC<BlueprintCardProps> = ({ item, onDelete }) => {
  return (
    <div className="break-inside-avoid mb-6 bg-white border border-slate-300 group relative transition-all duration-300 ease-out hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]">
      {/* Technical Header / ID Label + Delete Action */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-slate-200 bg-slate-50">
        <span className="font-mono text-xs text-slate-500">#{item.id}</span>

        {/* DELETE BUTTON - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="
                group/btn flex items-center justify-center w-6 h-6 
                border border-transparent hover:border-red-200 hover:bg-red-50 
                transition-all duration-200 cursor-pointer
            "
          aria-label="Delete Item"
        >
          <X
            size={14}
            className="text-slate-400 group-hover/btn:text-red-600 transition-colors"
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Image Content */}
      {item.type === 'image' && item.imageUrl && (
        <div className="relative border-b border-slate-300 bg-slate-100 group-hover:opacity-95">
          <img
            src={item.imageUrl}
            alt={item.title || 'Blueprint Asset'}
            className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 right-2 bg-white border border-slate-300 p-1 shadow-sm">
            <ImageIcon size={12} className="text-slate-900" />
          </div>
        </div>
      )}

      {/* Text Body */}
      <div className={`p-4 ${item.heightClass || ''}`}>
        {item.title && (
          <h3 className="font-sans font-bold text-slate-900 text-base mb-2">
            {item.title}
          </h3>
        )}

        {item.description ? (
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>
        ) : (
          /* Technical placeholder pattern for empty text cards */
          <div className="space-y-3 mt-1 opacity-40">
            <div className="h-2 w-full bg-slate-200" />
            <div className="h-2 w-5/6 bg-slate-200" />
            <div className="h-2 w-4/6 bg-slate-200" />
          </div>
        )}
      </div>

      {/* Footer / Meta */}
      <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-slate-300"></div>
          <div className="w-1.5 h-1.5 bg-slate-300"></div>
          <div className="w-1.5 h-1.5 bg-slate-300"></div>
        </div>
        <MoreHorizontal size={14} className="text-slate-300" />
      </div>
    </div>
  );
};

// --- Main Layout ---

const WaterfallDemo = () => {
  // Initial State Data
  const [items, setItems] = useState<MasonryItem[]>([
    { id: '001', type: 'text', heightClass: 'h-32' },
    { id: '002', type: 'text', heightClass: 'h-16' },
    { id: '003', type: 'text', heightClass: 'h-24' },
    { id: '004', type: 'text', heightClass: 'h-20' },
    {
      id: 'SPECIAL',
      type: 'image',
      title: "I'm Special",
      description: "Let's have a meal. Caloric unit visualization.",
      imageUrl:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    },
    { id: '006', type: 'text', heightClass: 'h-40' },
    { id: '007', type: 'text', heightClass: 'h-24' },
    { id: '008', type: 'text', heightClass: 'h-16' },
    { id: '009', type: 'text', heightClass: 'h-12' },
    { id: '010', type: 'text', heightClass: 'h-28' },
    { id: '011', type: 'text', heightClass: 'h-32' },
    { id: '012', type: 'text', heightClass: 'h-48' },
    { id: '013', type: 'text', heightClass: 'h-16' },
    { id: '014', type: 'text', heightClass: 'h-20' },
    { id: '015', type: 'text', heightClass: 'h-32' },
  ]);

  // Delete Handler
  const handleDelete = (id: string | number) => {
    // Filter out the item with the matching ID
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-[#f8fafc] min-h-screen font-sans">
      {/* Header Section */}
      <header className="mb-8 border-b border-slate-300 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
            Waterfall Grid
          </h1>
          <p className="text-slate-500 font-mono text-xs mt-1">
            INTERACTIVE_MODE: ENABLED
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Trash2 size={12} />
          <span>DELETED_COUNT: {15 - items.length}</span>
        </div>
      </header>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <BlueprintCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="w-full py-20 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
          <Trash2 size={48} className="mb-4 opacity-50" />
          <span className="font-mono text-sm">NO_DATA_REMAINING</span>
        </div>
      )}
    </div>
  );
};

export default WaterfallDemo;
