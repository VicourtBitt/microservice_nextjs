"use client"

import { useEffect, useRef } from "react"

/**
 * Hook to update document title with automatic cleanup
 * @param title The title to set
 * @param siteName Optional site name to append (defaults to "")
 * @returns The current title
 */
export default function useTitle(title: string, siteName: string = "") {
    // Keep track of the previous title to restore on unmount
    const previousTitle = useRef(typeof document !== 'undefined' ? document.title : "");
    
    // Format the full title
    const formattedTitle = siteName 
        ? `${title} | ${siteName}` 
        : title;
    
    useEffect(() => {
        // Skip during SSR
        if (typeof document === 'undefined') return;
        
        // Capture the current value of previousTitle when the effect runs
        const originalTitle = previousTitle.current;
        
        // Only update if the title actually changed
        if (document.title !== formattedTitle) {
            document.title = formattedTitle;
        }
        
        // Cleanup: restore the previous title when component unmounts
        return () => {
            // Only if the component that set the title is unmounting
            if (document.title === formattedTitle) {
                document.title = originalTitle;
            }
        };
    }, [formattedTitle]);

    return formattedTitle;
}