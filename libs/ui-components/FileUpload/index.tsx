import React, { useCallback, useMemo, useState } from 'react';

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
  minHeight: '150px',
});

const focusedStyle = {
  borderColor: '#269984',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 150,
  height: 150,
  padding: 4,
  // boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
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
  setFile?: (file: File) => void;
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
  setFile = () => {},
}: FileUploadProps) => {
  const [files, setFiles] = useState<any>([]);

  const {
    getRootProps,
    getInputProps,
    // isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    // isFileDialogActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          setFile(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle(borderColor, borderStyle, borderWidth, color),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file: File & any) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={containerClass}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {thumbs.length > 0 ? (
          <p style={thumbsContainer}>{thumbs}</p>
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
