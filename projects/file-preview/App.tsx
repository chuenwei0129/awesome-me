import React from 'react';
import { match, P } from 'ts-pattern';
import Docx from './Docx';
import Text from './Text';

const extenstions = [
  'txt',
  'md',
  'json',
  'xml',
  'docx',
  'xlsx',
  'pdf',
  // 'mp4',
  // 'wav',
  // 'jpg',
  // 'gif',
  'png',
  null,
] as const;

type FileExt = (typeof extenstions)[number];

const App = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const fileExt: FileExt =
    file === null ? null : (file.name.split('.').pop() as FileExt);

  const onClick = async () => {
    const [fileHandle] = await self.showOpenFilePicker();
    const file = await fileHandle.getFile();
    setFile(file);
  };

  return (
    <div>
      <h2>在线文档查看</h2>
      <input type="text" inputMode="numeric" placeholder="请输入文档ID" />
      <button type="button" onClick={onClick}>
        选择文件
      </button>
      <span className="ml-5">{file ? file.name : '未选择任何文件'}</span>
      {match(fileExt)
        .with(null, () => <>{null}</>)
        .with('docx', () => <Docx file={file!} />)
        .with('png', () => (
          <object data={file ? URL.createObjectURL(file) : ''} type="image/png">
            <p>
              无法预览您的 Word 文件，请
              <a href="path/to/your/document.docx">点击此处</a>下载。
            </p>
          </object>
        ))
        .with('pdf', () => (
          <div>
            <object
              className="w-full h-[100vh]"
              type="application/pdf"
              data={file ? URL.createObjectURL(file) : ''}
            ></object>
          </div>
        ))
        .with(P.union('md', 'txt', 'json', 'xml'), () => <Text file={file!} />)
        .otherwise(() => (
          <>
            <div className="text-center mt-20">
              不支持 .{fileExt} 格式的在线预览，请下载后预览或转换为支持的格式
            </div>
            <div className="text-center">
              支持 docx, xlsx, pptx, pdf 以及纯文本格式和各种图片格式的在线预览
            </div>
          </>
        ))}
    </div>
  );
};

export default App;
