
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { View, Theme } from '../App';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    onHomeClick: () => void;
    onNavClick: (view: View) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const navLinks: { view: View, label: string }[] = [
    { view: 'privacy', label: 'Privacy' },
    { view: 'terms', label: 'Terms' },
    { view: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onNavClick, theme, setTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (view: View) => {
        onNavClick(view);
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-base-200/50 dark:bg-dark-base-200/50 backdrop-blur-sm sticky top-0 z-50 border-b border-base-300 dark:border-dark-base-300 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <button 
                        className="flex items-center"
                        onClick={onHomeClick}
                        title="Start Over"
                    >
                        <SparklesIcon className="w-8 h-8 text-brand-primary dark:text-dark-brand-primary" />
                        <h1 className="ml-2 text-xl font-bold tracking-tight text-content-100 dark:text-dark-content-100">
                            Sales Coach AI
                        </h1>
                    </button>

                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex items-center space-x-6">
                            {navLinks.map(link => (
                                <button key={link.view} onClick={() => handleLinkClick(link.view)} className="text-sm font-medium text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors">
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                        
                        <ThemeToggle theme={theme} setTheme={setTheme} />

                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-content-200 dark:text-dark-content-200">
                                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <nav className="md:hidden pb-4 border-t border-base-300 dark:border-dark-base-300">
                        {navLinks.map(link => (
                             <button key={link.view} onClick={() => handleLinkClick(link.view)} className="block py-2 text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors w-full text-left">
                                {link.label}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};
