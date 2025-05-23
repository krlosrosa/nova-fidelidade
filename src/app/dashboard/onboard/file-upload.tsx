'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  value?: string;
  onChange: (value: string) => void;
  accept?: string;
}

export function FileUpload({ value, onChange, accept }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      // Aqui você faria o upload real do arquivo para o servidor
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        onChange(URL.createObjectURL(acceptedFiles[0]));
      }, 1500);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
      }`}
    >
      <input {...getInputProps()} />
      
      {isUploading ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Enviando arquivo...</p>
        </div>
      ) : file || value ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          {file?.type.startsWith('image/') || (value && value.startsWith('data:image')) ? (
            <img
              src={file ? URL.createObjectURL(file) : value}
              alt="Uploaded file"
              className="h-32 w-32 object-cover rounded-md"
            />
          ) : (
            <div className="bg-secondary p-4 rounded-md">
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <p className="text-sm font-medium">
            {file ? file.name : 'Arquivo carregado'}
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Trocar arquivo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste ou clique para enviar'}
          </p>
          <p className="text-xs text-muted-foreground">
            {accept ? `Formatos suportados: ${accept}` : 'Qualquer tipo de arquivo'}
          </p>
        </div>
      )}
    </div>
  );
}