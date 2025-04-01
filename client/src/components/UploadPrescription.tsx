import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export function UploadPrescription() {
  const [prescriptionText, setPrescriptionText] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate file upload and OCR processing
    toast.loading('Processing prescription...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Prescription processed successfully!');
      setPrescriptionText('Take Amoxicillin 500mg twice daily for 7 days.');
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Upload Prescription</h1>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-purple-500 bg-purple-50/10' : 'border-gray-600 hover:border-purple-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-300">
          {isDragActive
            ? 'Drop the prescription here'
            : 'Drag & drop a prescription image, or click to select'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: JPEG, PNG
        </p>
      </div>

      {prescriptionText && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Extracted Information</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-300">{prescriptionText}</p>
          </div>
        </div>
      )}
    </div>
  );
}