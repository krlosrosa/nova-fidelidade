'use client'

import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onUpload: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export function FileUpload({ onUpload, accept, multiple = false }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-2">
        {isDragActive
          ? 'Solte os arquivos aqui'
          : 'Arraste arquivos ou clique para selecionar'}
      </p>
      {files.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          {files.map((file) => (
            <div key={file.name}>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}