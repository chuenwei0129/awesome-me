import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../src/utils/cn';
import lrcFile from './MT.lrc';

interface Lyric {
  time: number;
  text: string;
  highlight?: 'important' | 'todo' | 'issue' | null;
}

function parseLrc(lrc: string): Lyric[] {
  const lines = lrc.split('\n');

  return lines
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const match = line.match(/\[(?:(\d{2}):)?(\d{2}):(\d{2})\](.+)/);
      if (match) {
        const [, hours, minutes, seconds, text] = match;
        const totalSeconds = parseInt(hours || '0') * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        return { time: totalSeconds, text: text.trim() };
      }
      return null;
    })
    .filter((lyric): lyric is Lyric => lyric !== null);
}

// 模拟翻译函数
const mockTranslateLyric = async (text: string, targetLanguage: string = 'en') => {
  return text
    .split('')
    .map((char) => char + '_')
    .join('');
};

const App = () => {
  const lrcData = useMemo(() => parseLrc(lrcFile), []);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [editableLrcData, setEditableLrcData] = useState(lrcData);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [selectedText, setSelectedText] = useState<string>('');
  const [highlightType, setHighlightType] = useState<'' | 'important' | 'todo' | 'issue' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState<boolean>(false);
  const [replaceType, setReplaceType] = useState<'single' | 'all'>('single');

  const [translatedLrcData, setTranslatedLrcData] = useState<string[]>([]);
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null!);
  const lyricsRef = useRef<HTMLUListElement>(null!);

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateCurrentTime = () => {
      const currentTime = audioElement.currentTime;

      const index = editableLrcData.findIndex((lyric) => lyric.time > currentTime);
      if (index === -1) {
        setCurrentLyricIndex(editableLrcData.length - 1);
      } else {
        setCurrentLyricIndex(index - 1);
      }
    };

    audioElement.addEventListener('timeupdate', updateCurrentTime);
    return () => {
      audioElement.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [editableLrcData]);

  useEffect(() => {
    const currentLyricElement = lyricsRef.current.querySelector<HTMLLIElement>(`li:nth-child(${currentLyricIndex + 1})`);

    if (currentLyricElement) {
      currentLyricElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentLyricIndex]);

  const handleLyricClick = (time: number) => {
    const audioElement = audioRef.current;
    audioElement.currentTime = time;
  };

  const handleLyricChange = (index: number, newText: string) => {
    const updatedLrcData = [...editableLrcData];
    updatedLrcData[index] = { ...updatedLrcData[index], text: newText };
    setEditableLrcData(updatedLrcData);
  };

  const handleSearch = () => {
    const indices = editableLrcData.map((lyric, index) => (lyric.text.includes(searchText) ? index : -1)).filter((index) => index !== -1);
    setSearchResults(indices);
    setCurrentSearchIndex(0);
    if (indices.length > 0) {
      setCurrentLyricIndex(indices[0]);
      const currentLyricElement = lyricsRef.current.querySelector<HTMLLIElement>(`li:nth-child(${indices[0] + 1})`);
      currentLyricElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNextMatch = () => {
    if (searchResults.length > 0) {
      const nextIndex = (currentSearchIndex + 1) % searchResults.length;
      setCurrentSearchIndex(nextIndex);
      setCurrentLyricIndex(searchResults[nextIndex]);
      const currentLyricElement = lyricsRef.current.querySelector<HTMLLIElement>(`li:nth-child(${searchResults[nextIndex] + 1})`);
      currentLyricElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePreviousMatch = () => {
    if (searchResults.length > 0) {
      const prevIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
      setCurrentSearchIndex(prevIndex);
      setCurrentLyricIndex(searchResults[prevIndex]);
      const currentLyricElement = lyricsRef.current.querySelector<HTMLLIElement>(`li:nth-child(${searchResults[prevIndex] + 1})`);
      currentLyricElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleReplace = () => {
    setReplaceType('single');
    setIsReplaceModalOpen(true);
  };

  const handleReplaceAll = () => {
    setReplaceType('all');
    setIsReplaceModalOpen(true);
  };

  const confirmReplace = () => {
    if (replaceType === 'single') {
      if (searchResults.length > 0) {
        const updatedLrcData = [...editableLrcData];
        const index = searchResults[currentSearchIndex];
        updatedLrcData[index] = { ...updatedLrcData[index], text: updatedLrcData[index].text.replace(searchText, replaceText) };
        setEditableLrcData(updatedLrcData);
      }
    } else {
      const updatedLrcData = editableLrcData.map((lyric) => ({
        ...lyric,
        text: lyric.text.replace(new RegExp(searchText, 'g'), replaceText),
      }));
      setEditableLrcData(updatedLrcData);
    }
    setIsReplaceModalOpen(false);
  };

  const handleHighlight = (type: 'important' | 'todo' | 'issue' | null) => {
    if (highlightIndex !== null) {
      const updatedLrcData = [...editableLrcData];
      updatedLrcData[highlightIndex] = { ...updatedLrcData[highlightIndex], highlight: type };
      setEditableLrcData(updatedLrcData);
      setIsModalOpen(false);
      setSelectedText('');
      setHighlightType(null);
      setHighlightIndex(null);
    }
  };

  const handleTextMouseUp = (index: number) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      setIsModalOpen(true);
      setHighlightIndex(index);
    }
  };

  const handleTranslate = async () => {
    const translations = await Promise.all(
      editableLrcData.map(async (lyric) => {
        const translatedText = await mockTranslateLyric(lyric.text);
        return translatedText;
      }),
    );
    setTranslatedLrcData(translations);
    setIsTranslated(true);
  };

  return (
    <div className="text-center">
      <audio ref={audioRef} src="/audio-player/MT.mp3" controls></audio>
      <div className="m-2">
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search lyrics..." className={cn('p-2', 'border', 'border-gray-300')} />
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with..."
          className={cn('p-2', 'border', 'border-gray-300', 'ml-2')}
        />
        <button type="button" onClick={handleSearch} className={cn('p-2', 'ml-2', 'bg-blue-500', 'text-white')}>
          Search
        </button>
        <button type="button" onClick={handleReplace} className={cn('p-2', 'ml-2', 'bg-green-500', 'text-white')}>
          Replace
        </button>
        <button type="button" onClick={handleReplaceAll} className={cn('p-2', 'ml-2', 'bg-red-500', 'text-white')}>
          Replace All
        </button>
        <button type="button" onClick={handlePreviousMatch} className={cn('p-2', 'ml-2', 'bg-gray-500', 'text-white')}>
          Prev
        </button>
        <button type="button" onClick={handleNextMatch} className={cn('p-2', 'ml-2', 'bg-gray-500', 'text-white')}>
          Next
        </button>
        <button type="button" onClick={handleTranslate} className={cn('p-2', 'ml-2', 'bg-purple-500', 'text-white')}>
          翻译
        </button>
        <div>Search Matches: {searchResults.length > 0 ? `${currentSearchIndex + 1} / ${searchResults.length}` : '0 / 0'}</div>
      </div>
      <div className={cn('h-[420px]', 'border', 'border-solid', 'border-gray-300', 'overflow-y-auto')}>
        <ul ref={lyricsRef} className={cn('transition-transform', 'duration-200')}>
          {editableLrcData.map((item, index) => {
            const isCurrentSearchResult = searchResults.includes(index);
            const isCurrentSearchHighlight = index === searchResults[currentSearchIndex];
            return (
              <li
                key={item.time}
                className={cn(
                  'list-none',
                  'h-[30px]',
                  'leading-[30px]',
                  'transition-transform',
                  'duration-300',
                  item.highlight ? `highlight-${item.highlight}` : '',
                  {
                    'bg-black': isCurrentSearchResult,
                  },
                  isCurrentSearchHighlight ? 'bg-yellow-500' : '',
                )}
                onClick={() => handleLyricClick(item.time)}
              >
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleLyricChange(index, e.target.value)}
                  onMouseUp={() => handleTextMouseUp(index)}
                  className={cn(
                    index === currentLyricIndex ? 'scale-[1.5] text-yellow-300' : '',
                    {
                      'text-white': isCurrentSearchResult,
                    },
                    'w-full',
                    'text-center',
                    'bg-transparent',
                    'border-none',
                    'outline-none',
                  )}
                />
                {isTranslated && <div className={cn('text-green-500', 'underline', 'underline-dotted')}>{translatedLrcData[index]}</div>}
              </li>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <div className={cn('modal', 'fixed', 'inset-0', 'bg-gray-500', 'bg-opacity-75', 'flex', 'items-center', 'justify-center')}>
          <div className={cn('bg-white', 'p-4', 'rounded')}>
            <h2 className={cn('text-xl', 'mb-4')}>标注选中的文字</h2>
            <div className={cn('flex', 'justify-between')}>
              <button className={cn('p-2', 'bg-blue-500', 'text-white')} onClick={() => handleHighlight('important')}>
                重点
              </button>
              <button className={cn('p-2', 'bg-green-500', 'text-white')} onClick={() => handleHighlight('todo')}>
                代办
              </button>
              <button className={cn('p-2', 'bg-red-500', 'text-white')} onClick={() => handleHighlight('issue')}>
                问题
              </button>
              <button className={cn('p-2', 'bg-gray-500', 'text-white')} onClick={() => handleHighlight(null)}>
                取消标注
              </button>
            </div>
          </div>
        </div>
      )}

      {isReplaceModalOpen && (
        <div className={cn('modal', 'fixed', 'inset-0', 'bg-gray-500', 'bg-opacity-75', 'flex', 'items-center', 'justify-center')}>
          <div className={cn('bg-white', 'p-4', 'rounded')}>
            <h2 className={cn('text-xl', 'mb-4')}>确认替换</h2>
            <p>{`您确定要将 "${searchText}" 替换为 "${replaceText}" 吗？`}</p>
            <div className={cn('flex', 'justify-between', 'mt-4')}>
              <button className={cn('p-2', 'bg-blue-500', 'text-white')} onClick={confirmReplace}>
                确认
              </button>
              <button className={cn('p-2', 'bg-gray-500', 'text-white')} onClick={() => setIsReplaceModalOpen(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
