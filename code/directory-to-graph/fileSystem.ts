interface IFileSystemEntry {
  name: string;
  type: 'file' | 'directory';
  handle: FileSystemHandle; // 添加此属性
  children?: IFileSystemEntry[];
}

type ReadDirectoryFunction = (
  dirHandle: FileSystemDirectoryHandle,
) => Promise<IFileSystemEntry>;

const readDirectory: ReadDirectoryFunction = async (dirHandle) => {
  const entries: IFileSystemEntry[] = [];

  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'directory') {
      const subDirectoryStructure = await readDirectory(entry);
      entries.push({
        ...subDirectoryStructure,
        handle: entry,
      });
    } else {
      entries.push({ name: entry.name, type: 'file', handle: entry });
    }
  }

  return {
    name: dirHandle.name,
    type: 'directory',
    handle: dirHandle,
    children: entries,
  };
};

export const getDirectoryStructure = async (): Promise<IFileSystemEntry> => {
  const dirHandle = await window.showDirectoryPicker();
  const structure = await readDirectory(dirHandle);
  return structure;
};
