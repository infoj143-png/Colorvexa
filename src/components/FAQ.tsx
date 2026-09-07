"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 hover:text-sky-600 transition-colors focus:outline-hidden focus:text-sky-600"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-sky-600" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 text-sm text-slate-600 leading-relaxed pr-6">
          {answer}
        </div>
      )}
    </div>
  );
}

export interface FAQProps {
  items: FAQItemProps[];
  title?: string;
  description?: string;
}

export function FAQ({ items, title, description }: FAQProps) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
      {(title || description) && (
        <div className="mb-8 border-b border-slate-100 pb-6">
          {title && <h2 className="text-2xl font-bold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        </div>
      )}
      <div className="divide-y divide-slate-200">
        {items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
