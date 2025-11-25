
import React from 'react';
import { GlobeIcon } from './icons/GlobeIcon';

interface LanguageSelectorProps {
    selectedLanguage: string;
    onSelect: (language: string) => void;
    disabled?: boolean;
}

const languages = [
    "Auto-Detect",
    "English",
    "Hindi",
    "Marathi",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Mandarin Chinese",
    "Russian",
    "Portuguese",
    "Arabic",
    "Korean",
    "Italian",
    "Dutch",
    "Turkish"
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelect, disabled }) => {
    return (
        <div className="max-w-lg mx-auto bg-base-200/50 dark:bg-dark-base-200/50 p-4 rounded-lg border border-base-300 dark:border-dark-base-300 mb-6">
            <label className="flex items-center text-sm font-semibold mb-2 text-content-100 dark:text-dark-content-100">
                <GlobeIcon className="w-5 h-5 mr-2" />
                Audio Language
            </label>
             <div className="relative">
                <select
                    value={selectedLanguage}
                    onChange={(e) => onSelect(e.target.value)}
                    disabled={disabled}
                    className="w-full p-2 bg-base-100 dark:bg-dark-base-100 border border-base-300 dark:border-dark-base-300 rounded-md text-sm focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 text-content-100 dark:text-dark-content-100"
                >
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-content-200 dark:text-dark-content-200">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <p className="mt-2 text-xs text-content-200 dark:text-dark-content-200">
                Select the primary language spoken in the audio. The transcript will be in the original language (e.g., Hindi), while the coaching analysis will be in English.
            </p>
        </div>
    );
};
