import {
  ChevronDown,
  ChevronRight,
  File,
  FileCode,
  FileJson,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  Settings,
} from 'lucide-react';
import React, { useState } from 'react';

// --- Mock Data Structure ---
const FILE_SYSTEM = [
  {
    id: 'root',
    name: 'PROJECT_ALPHA',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              { id: 'Button.tsx', name: 'Button.tsx', type: 'file' },
              { id: 'Header.tsx', name: 'Header.tsx', type: 'file' },
            ],
          },
          {
            id: 'utils',
            name: 'utils',
            type: 'folder',
            children: [
              { id: 'math.ts', name: 'math.ts', type: 'file' },
              { id: 'parser.ts', name: 'parser.ts', type: 'file' },
            ],
          },
          { id: 'App.tsx', name: 'App.tsx', type: 'file' },
          { id: 'index.tsx', name: 'index.tsx', type: 'file' },
        ],
      },
      {
        id: 'config',
        name: 'config',
        type: 'folder',
        children: [
          { id: 'tsconfig.json', name: 'tsconfig.json', type: 'file' },
          {
            id: 'tailwind.config.js',
            name: 'tailwind.config.js',
            type: 'file',
          },
        ],
      },
      {
        id: 'assets',
        name: 'assets',
        type: 'folder',
        children: [
          { id: 'schema.png', name: 'schema.png', type: 'file' },
          { id: 'logo.svg', name: 'logo.svg', type: 'file' },
        ],
      },
      { id: 'package.json', name: 'package.json', type: 'file' },
      { id: 'README.md', name: 'README.md', type: 'file' },
      { id: '.env', name: '.env', type: 'file' },
    ],
  },
];

// --- Helper to get Icon based on filename ---
const getFileIcon = (name) => {
  if (name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.js'))
    return FileCode;
  if (name.endsWith('.json')) return FileJson;
  if (name.endsWith('.png') || name.endsWith('.svg')) return ImageIcon;
  if (name.endsWith('.config.js') || name.startsWith('.')) return Settings;
  return File;
};

// --- Recursive Tree Node Component ---
const TreeNode = ({ node, level = 0, onSelect, selectedId }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for demo
  const isFolder = node.type === 'folder';
  const isSelected = selectedId === node.id;

  // Icon Logic
  const Icon = isFolder
    ? isOpen
      ? FolderOpen
      : Folder
    : getFileIcon(node.name);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isFolder) setIsOpen(!isOpen);
    onSelect(node.id);
  };

  return (
    <div className="select-none">
      {/* Node Row */}
      <div
        onClick={handleToggle}
        className={`
          group flex items-center gap-1.5 py-1 px-2 cursor-pointer transition-colors border-l-2
          ${
            isSelected
              ? 'bg-slate-900 text-white border-slate-900'
              : 'hover:bg-slate-100 text-slate-700 border-transparent hover:border-slate-300'
          }
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Toggle Chevron for Folders */}
        <span className="w-4 flex justify-center opacity-70">
          {isFolder &&
            (isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
        </span>

        {/* File/Folder Icon */}
        <Icon
          size={14}
          className={
            isSelected
              ? 'text-white'
              : isFolder
              ? 'text-slate-400 group-hover:text-slate-900'
              : 'text-slate-500'
          }
          strokeWidth={1.5}
        />

        {/* Filename */}
        <span className="font-mono text-xs tracking-tight">{node.name}</span>
      </div>

      {/* Children (Recursive) */}
      {isFolder && isOpen && node.children && (
        <div className="relative">
          {/* Engineering Guide Line (Vertical Line) */}
          <div
            className="absolute w-px bg-slate-300"
            style={{ left: `${level * 16 + 15}px`, top: 0, bottom: 0 }}
          />
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Tree Wrapper ---
const FileTree = () => {
  const [selectedId, setSelectedId] = useState('App.tsx');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tree Header */}
      <div className="px-3 py-2 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Explorer
        </span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {FILE_SYSTEM.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-1 border-t border-slate-200 bg-slate-50 font-mono text-[10px] text-slate-400 flex justify-between">
        <span>{selectedId}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

export default FileTree;
