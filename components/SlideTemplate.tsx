"use client";

import { ReactNode } from "react";

interface SlideTemplateProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function SlideTemplate({ id, children, className = "" }: SlideTemplateProps) {
    return (
        <section
            id={id}
            className="slide-wrapper"
        >
            <div className={`slide-content-canvas ${className}`}>
                {children}
            </div>
        </section>
    );
}
