import { useCallback, useMemo } from 'react';

import { useDropzone } from 'react-dropzone';

const baseStyle = (
  borderColor: string,
  borderStyle: string,
  borderWidth: number,
  color: string
) => ({
  flex: 1,
  display: 'flex',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flexDirection: 'column' as any,
  alignItems: 'center',
  padding: '15px',
  borderWidth: borderWidth,
  borderRadius: 4,
  borderColor: borderColor,
  borderStyle: borderStyle,
  backgroundColor: '#fafafa',
  color: color,
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textAlign: 'center' as any,
  height: '100%',
});

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface FileUploadProps {
  containerClass?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed';
  uploadIcon?: string;
  uploadLabel?: string;
  uploadRestrictionText?: string;
  borderWidth?: number;
  color?: string;
}
const FileUpload = ({
  containerClass,
  borderColor = '#54D4BD',
  borderStyle = 'dashed',
  uploadIcon,
  uploadLabel = "Drag 'n' drop some files here, or click to select files",
  uploadRestrictionText,
  color = '#54d4bd',
  borderWidth = 2,
}: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('accepted', acceptedFiles);
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    // isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    // isFileDialogActive,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const style = useMemo(
    () => ({
      ...baseStyle(borderColor, borderStyle, borderWidth, color),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = useMemo(() => {
    return acceptedFiles.map((file: File & { [key: string]: any }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  }, [acceptedFiles.length]);

  return (
    <div className={containerClass}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <p>{files}</p>
        ) : (
          <>
            {uploadIcon && (
              <img alt="upload icon" src={uploadIcon} className="w-30 h-30" />
            )}
            <p dangerouslySetInnerHTML={{ __html: uploadLabel }} className="" />
            <p className="text-secondary-300">{uploadRestrictionText}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
