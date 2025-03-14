
import { useEffect } from 'react';

/**
 * A hook to update the document title
 * @param title - The title to set for the document
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    // Save the original title to restore when component unmounts
    const originalTitle = document.title;
    
    // Set the new title
    document.title = title;
    
    // Clean up function to restore the original title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title]); // Only re-run if title changes
};
