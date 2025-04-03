import React, { useState } from 'react';
import { Languages, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export function Language() {
  const [selectedLang, setSelectedLang] = useState('en');

  const handleLanguageChange = (code: string) => {
    setSelectedLang(code);
    toast.success(`Language changed to ${languages.find(l => l.code === code)?.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Languages className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold">Language Settings</h1>
      </div>

      <div className="grid gap-4">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
              selectedLang === lang.code ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-lg">{lang.name}</span>
            </div>
            {selectedLang === lang.code && (
              <Check className="w-5 h-5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}