import React from 'react';
import { View } from '../App';

interface FooterProps {
    onNavClick: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
    return (
        <footer className="bg-base-200 mt-auto">
            <div className="container mx-auto py-6 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-content-200">
                    <p>&copy; {new Date().getFullYear()} Sales Coach AI. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <button onClick={() => onNavClick('privacy')} className="hover:text-brand-accent transition-colors">Privacy Policy</button>
                        <button onClick={() => onNavClick('terms')} className="hover:text-brand-accent transition-colors">Terms of Service</button>
                        <button onClick={() => onNavClick('contact')} className="hover:text-brand-accent transition-colors">Contact</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};