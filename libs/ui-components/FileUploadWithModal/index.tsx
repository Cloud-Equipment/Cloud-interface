import React, { useCallback, useMemo, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { Modal } from '@mui/material';

import AddMoreDocumentModal from './AddMoreDocumentModal';

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
  setFile?: (file: File | null) => void;
  onClick: (cb: () => void) => void;
}
const FileUploadWithModal = ({
  containerClass,
  borderColor = '#54D4BD',
  borderStyle = 'dashed',
  uploadIcon,
  uploadLabel = "Drag 'n' drop some files here, or click to select files",
  uploadRestrictionText,
  color = '#54d4bd',
  borderWidth = 2,
  setFile = () => {},
  onClick,
}: FileUploadProps) => {
  const [addMoreDocumentModalIsOpen, setAddMoreDocumentModalIsOpen] =
    useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
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
    open,
    // isFileDialogActive,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
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

  const onClose = () => {
    setAddMoreDocumentModalIsOpen(false);
  };

  const onSubmit = (file: File | null) => {
    setFile(file);
  };

  return (
    <>
      <Modal open={addMoreDocumentModalIsOpen} onClose={onClose}>
        <AddMoreDocumentModal onSubmit={onSubmit} {...{ onClose, setFile }} />
      </Modal>
      <div
        className={containerClass}
        onClick={() => setAddMoreDocumentModalIsOpen(true)}
      >
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <>
            {uploadIcon && (
              <img alt="upload icon" src={uploadIcon} className="w-30 h-30" />
            )}
            <p dangerouslySetInnerHTML={{ __html: uploadLabel }} className="" />
            <p className="text-secondary-300">{uploadRestrictionText}</p>
          </>
        </div>
      </div>
    </>
  );
};

export default FileUploadWithModal;
