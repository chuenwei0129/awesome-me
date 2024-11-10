import React, { useEffect, useMemo, useRef, useState } from 'react';
import lrcFile from './MT.lrc';

interface Lyric {
  time: number;
  text: string;
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

const App = () => {
  const lrcData = useMemo(() => parseLrc(lrcFile), []);

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [editableLrcData, setEditableLrcData] = useState(lrcData);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
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
    audioElement.play();
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
    if (searchResults.length > 0) {
      const updatedLrcData = [...editableLrcData];
      const index = searchResults[currentSearchIndex];
      updatedLrcData[index] = { ...updatedLrcData[index], text: updatedLrcData[index].text.replace(searchText, replaceText) };
      setEditableLrcData(updatedLrcData);
    }
  };

  const handleReplaceAll = () => {
    const updatedLrcData = editableLrcData.map((lyric) => ({
      ...lyric,
      text: lyric.text.replace(new RegExp(searchText, 'g'), replaceText),
    }));
    setEditableLrcData(updatedLrcData);
  };

  return (
    <div className="text-center">
      <audio ref={audioRef} src="/audio-player/MT.mp3" controls></audio>
      <div className="m-2">
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search lyrics..." className="p-2 border border-gray-300" />
        <input type="text" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} placeholder="Replace with..." className="p-2 border border-gray-300 ml-2" />
        <button type="button" onClick={handleSearch} className="p-2 ml-2 bg-blue-500 text-white">
          Search
        </button>
        <button type="button" onClick={handleReplace} className="p-2 ml-2 bg-green-500 text-white">
          Replace
        </button>
        <button type="button" onClick={handleReplaceAll} className="p-2 ml-2 bg-red-500 text-white">
          Replace All
        </button>
        <button type="button" onClick={handlePreviousMatch} className="p-2 ml-2 bg-gray-500 text-white">
          Prev
        </button>
        <button type="button" onClick={handleNextMatch} className="p-2 ml-2 bg-gray-500 text-white">
          Next
        </button>
        <div>Search Matches: {searchResults.length > 0 ? `${currentSearchIndex + 1} / ${searchResults.length}` : '0 / 0'}</div>
      </div>
      <div className="h-[420px] border border-solid border-gray-300 overflow-y-auto">
        <ul ref={lyricsRef} className="transition-transform duration-200">
          {editableLrcData.map((item, index) => {
            return (
              <li key={item.time} className={`list-none h-[30px] leading-[30px] transition-transform duration-300`} onClick={() => handleLyricClick(item.time)}>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleLyricChange(index, e.target.value)}
                  className={`${index === currentLyricIndex ? 'scale-[1.5] text-yellow-300' : ''} w-full text-center bg-transparent border-none outline-none`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
