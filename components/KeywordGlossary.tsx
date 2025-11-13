import React, { useState } from 'react';
import { TagIcon } from './icons/TagIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const glossaryData = [
    {
        keyword: 'Pricing',
        definition: 'Discussion of the cost of the product or service, including list price, subscription fees, or one-time charges.',
        importance: 'A critical buying signal. Tracking mentions helps identify when the conversation shifts from value to cost, a key stage in the sales funnel.'
    },
    {
        keyword: 'Discount',
        definition: 'Any mention of price reductions, special offers, or negotiations on the standard pricing.',
        importance: 'Indicates the customer\'s price sensitivity and the salesperson\'s negotiation tactics. Over-reliance on discounts can signal a need for better value-selling skills.'
    },
    {
        keyword: 'Contract',
        definition: 'Terms, conditions, length of agreement, and legal aspects related to the sale.',
        importance: 'A strong indicator of a closing stage. Monitoring contract discussions helps assess deal commitment and identify potential legal hurdles.'
    },
    {
        keyword: 'Feature',
        definition: 'Specific capabilities, functionalities, or attributes of the product or service being sold.',
        importance: 'Shows which aspects of your product resonate most with customers. Helps coaches understand if salespeople are effectively connecting features to customer pain points.'
    },
    {
        keyword: 'Competitor',
        definition: 'Any mention of rival companies, products, or services by either the customer or the salesperson.',
        importance: 'Provides direct insight into the competitive landscape for this deal. Crucial for understanding objections and refining competitive positioning.'
    },
    {
        keyword: 'Timeline',
        definition: 'Discussion related to implementation schedules, decision-making deadlines, or project start dates.',
        importance: 'Helps gauge the urgency and seriousness of the buyer. A clear timeline is often a sign of a qualified lead moving towards a decision.'
    },
    {
        keyword: 'Budget',
        definition: 'The amount of money the customer has allocated for the purchase.',
        importance: 'A fundamental qualifying factor. Tracking budget conversations ensures salespeople are identifying the customer\'s financial capacity early in the process.'
    }
];

const AccordionItem: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border border-base-300 dark:border-dark-base-300 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-content-100 dark:text-dark-content-100 bg-base-200/50 dark:bg-dark-base-200/50 hover:bg-base-300/50 dark:hover:bg-dark-base-300/50"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="p-4 bg-base-100 dark:bg-dark-base-100 text-content-200 dark:text-dark-content-200 text-sm space-y-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KeywordGlossary: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-20 max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <TagIcon className="w-12 h-12 mx-auto mb-4 text-brand-accent dark:text-dark-brand-accent" />
                <h2 className="text-3xl font-bold">Why These Keywords Matter</h2>
                <p className="mt-4 text-lg text-content-200 dark:text-dark-content-200">
                    Our AI tracks key terms that are strong indicators of a deal's health and progression. Understanding their context is crucial for effective coaching.
                </p>
            </div>
            <div className="space-y-3">
                {glossaryData.map((item, index) => (
                    <AccordionItem
                        key={item.keyword}
                        title={item.keyword}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    >
                        <p>
                            <strong className="font-semibold text-content-100 dark:text-dark-content-100">Definition:</strong> {item.definition}
                        </p>
                        <p>
                            <strong className="font-semibold text-content-100 dark:text-dark-content-100">Importance:</strong> {item.importance}
                        </p>
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
};