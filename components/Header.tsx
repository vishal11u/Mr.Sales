
import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { View, Theme } from '../App';
import { ThemeToggle } from './ThemeToggle';
import { GitHubIcon } from './icons/GitHubIcon';
import { ClarityAILogo } from './icons/ClarityAILogo';

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

    const githubRepoUrl = "https://github.com/google/aistudio-co-creation-examples";

    return (
        <>
            <header className="bg-base-200/50 dark:bg-dark-base-200/50 backdrop-blur-sm sticky top-0 z-40 border-b border-base-300 dark:border-dark-base-300 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <button 
                            className="flex items-center"
                            onClick={onHomeClick}
                            title="Start Over"
                        >
                            <ClarityAILogo className="w-8 h-8 text-brand-primary dark:text-dark-brand-primary" />
                            <h1 className="ml-2 text-xl font-bold tracking-tight text-content-100 dark:text-dark-content-100">
                                Clarity AI
                            </h1>
                        </button>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <nav className="hidden md:flex items-center space-x-6">
                                {navLinks.map(link => (
                                    <button key={link.view} onClick={() => handleLinkClick(link.view)} className="text-sm font-medium text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors">
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                            
                            <ThemeToggle theme={theme} setTheme={setTheme} />
                            
                            <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:block text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors" title="View on GitHub">
                                <GitHubIcon className="w-6 h-6" />
                            </a>

                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-content-200 dark:text-dark-content-200">
                                    <span className="sr-only">Open menu</span>
                                    {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/50 animate-fade-in-fast" onClick={() => setIsMenuOpen(false)}></div>
                    
                    {/* Drawer */}
                    <div className="fixed bottom-0 left-0 right-0 bg-base-200 dark:bg-dark-base-200 rounded-t-2xl shadow-2xl pt-4 px-6 pb-6 animate-slide-in-up">
                        <div className="w-12 h-1.5 bg-base-300 dark:bg-dark-base-300 rounded-full mx-auto mb-4"></div>
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-base-300 dark:border-dark-base-300">
                            <span className="font-semibold text-lg">Navigation</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col">
                           {navLinks.map(link => (
                                <button key={link.view} onClick={() => handleLinkClick(link.view)} className="text-lg text-left py-3 text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors w-full">
                                   {link.label}
                               </button>
                           ))}
                           <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-lg py-3 text-content-200 dark:text-dark-content-200 hover:text-brand-accent dark:hover:text-dark-brand-accent transition-colors w-full">
                                <GitHubIcon className="w-5 h-5 mr-3" />
                                GitHub
                           </a>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};