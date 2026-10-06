'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { toast } from '../ui/Sonner.tsx';

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  className?: string;
  label?: string;
  avatarMode?: boolean;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('The selected image could not be read'));
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

function isUploadResponse(value: unknown): value is { url: string } {
  return typeof value === 'object'
    && value !== null
    && 'url' in value
    && typeof value.url === 'string';
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = 'nexacrm',
  className = '',
  label = 'Upload Image',
  avatarMode = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);

      const base64Data = await readFileAsDataUrl(file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64Data, folder }),
      });

      if (!response.ok) {
        throw new Error(`Image upload failed (${response.status})`);
      }

      const data: unknown = await response.json();
      if (!isUploadResponse(data)) {
        throw new Error('The upload service returned an invalid response');
      }
      onChange(data.url);
      toast.success('Image uploaded to Cloudinary');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">{label}</label>}

      {value ? (
        <div className="relative inline-block group">
          <div
            className={`relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 ${
              avatarMode ? 'h-20 w-20 rounded-full' : 'h-32 w-full max-w-sm rounded-lg'
            }`}
          >
            <Image
              src={value}
              alt="Uploaded asset"
              fill
              sizes={avatarMode ? '80px' : '(max-width: 640px) 100vw, 384px'}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (onRemove) onRemove();
              else onChange('');
            }}
            className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full shadow hover:bg-rose-700 transition"
            aria-label="Remove uploaded image"
            title="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label={label}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex flex-col items-center justify-center ${
            avatarMode ? 'w-24 h-24 rounded-full p-2' : 'w-full py-6'
          } ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-900/50'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-1 text-indigo-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-[10px] font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-1 text-slate-500 dark:text-slate-400">
              <UploadCloud className={`${avatarMode ? 'h-5 w-5' : 'h-7 w-7'} text-slate-400`} />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {avatarMode ? 'Avatar' : 'Click or drop'}
              </span>
              {!avatarMode && <span className="text-[10px] text-slate-400">Cloudinary storage (max 5MB)</span>}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            aria-label={label}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
