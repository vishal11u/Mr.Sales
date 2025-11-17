import React, { useState } from 'react';
import { Keyword } from '../types';
import { XIcon } from './icons/XIcon';
import { TagIcon } from './icons/TagIcon';

interface KeywordInputProps {
    keywords: Keyword[];
    onAddKeyword: (text: string) => void;
    onRemoveKeyword: (text: string) => void;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, onAddKeyword, onRemoveKeyword }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddKeyword(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-base-200/50 dark:bg-dark-base-200/50 p-4 rounded-lg border border-base-300 dark:border-dark-base-300">
            <label className="flex items-center text-sm font-semibold mb-2 text-content-100 dark:text-dark-content-100">
                <TagIcon className="w-5 h-5 mr-2" />
                Customize Keywords to Track (Optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-3 p-2 border border-base-300 dark:border-dark-base-300 rounded-md bg-base-100 dark:bg-dark-base-100 min-h-[40px]">
                {keywords.map((kw) => (
                    <span key={kw.text} className="flex items-center bg-brand-primary/20 dark:bg-dark-brand-primary/20 text-brand-primary dark:text-dark-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full animate-fade-in">
                        {kw.text}
                        <button onClick={() => onRemoveKeyword(kw.text)} className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10" aria-label={`Remove ${kw.text}`}>
                            <XIcon className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                {keywords.length === 0 && (
                    <p className="text-xs text-content-200 dark:text-dark-content-200 p-1">No keywords added. Add some below!</p>
                )}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a custom keyword..."
                    className="flex-grow w-full p-2 bg-base-100 dark:bg-dark-base-100 border border-base-300 dark:border-dark-base-300 rounded-md text-sm focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary focus:outline-none transition-colors"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-brand-primary dark:bg-dark-brand-primary text-white rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={!inputValue.trim()}
                >
                    Add
                </button>
            </div>
        </div>
    );
};
