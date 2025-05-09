// ==UserScript==
// @name         Novelbin - My Virtual Library Watermark Remover
// @namespace    https://github.com/InvictusNavarchus/novelbin-mvle-watermark-remover
// @downloadURL  https://raw.githubusercontent.com/InvictusNavarchus/novelbin-mvle-watermark-remover/master/novelbin-mvle-watermark-remover.user.js
// @updateURL    https://raw.githubusercontent.com/InvictusNavarchus/novelbin-mvle-watermark-remover/master/novelbin-mvle-watermark-remover.user.js
// @version      0.1.5
// @description  Removes sentences containing "My Virtual Library" watermarks from Novelbin
// @author       invictus
// @match        https://novelbin.me/*
// @match        https://novelbin.net/*
// @match        https://novelbin.com/*
// @match        https://novelbin.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    const DEBUG = true;
    
    /**
     * Removes sentences containing "My Virtual Library" text from a paragraph
     * @param {string} text - The paragraph text to clean
     * @return {string} The cleaned text with watermarked sentences removed
     */
    function removeWatermarkSentences(text) {
        if (!text.includes('My Virtual Library')) return text;
        
        // Match sentences containing the watermark
        // This regex looks for sentences containing "My Virtual Library" that either:
        // 1. End with punctuation (.!?), or
        // 2. End at the end of the string (no punctuation)
        const sentenceRegex = /[^.!?"']*My Virtual Library[^.!?]*(?:[.!?]|$)/gi;
        
        // Replace watermarked sentences with empty string
        const cleanedText = text.replace(sentenceRegex, '');
        
        return cleanedText.trim();
    }
    
    /**
     * Removes sentences containing "My Virtual Library" text from paragraphs
     */
    function removeWatermarks() {
        // Target the chapter content container or fall back to body
        const contentContainer = document.getElementById('chr-content') || document.body;
        
        // Find all paragraphs
        const paragraphs = contentContainer.querySelectorAll('p');
        let removedCount = 0;
        
        // Process each paragraph
        paragraphs.forEach(paragraph => {
            const  originalText = paragraph.textContent;
            if (originalText.includes('My Virtual Library')) {
                const cleanedText = removeWatermarkSentences(originalText);
                
                // Only update if we actually removed something
                if (cleanedText !== originalText) {
                    if (DEBUG) {
                        console.log('[MVL Remover] Removed watermark sentence from:', originalText.trim());
                        console.log('[MVL Remover] Resulting text:', cleanedText);
                    }
                    
                    paragraph.textContent = cleanedText;
                    removedCount++;
                    
                    // Remove empty paragraphs
                    if (cleanedText.length === 0) {
                        paragraph.remove();
                    }
                }
            }
        });
        
        if (removedCount > 0 && DEBUG) {
            console.log(`[MVL Remover] Cleaned ${removedCount} paragraphs containing watermark sentences`);
        }
        
        return removedCount;
    }
    
    /**
     * Debounce function to limit function call frequency
     */
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Create a debounced version of the watermark remover
    const debouncedRemoveWatermarks = debounce(removeWatermarks, 200);
    
    // Run initial removal
    const initialRemoved = removeWatermarks();
    if (DEBUG) {
        console.log(`[MVL Remover] Initial scan: removed ${initialRemoved} watermarks`);
    }
    
    // Set up observer for dynamic content
    const observer = new MutationObserver((mutations) => {
        let shouldRemove = false;
        
        // Check if any relevant nodes were added
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRemove = true;
                break;
            }
        }
        
        if (shouldRemove) {
            debouncedRemoveWatermarks();
        }
    });
    
    // Start observing the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also run when the page is fully loaded
    window.addEventListener('load', removeWatermarks);
    
    // Safety net: run periodically to catch any missed watermarks
    setInterval(removeWatermarks, 3000);
    
    if (DEBUG) {
        console.log('[MVL Remover] Script initialized and running');
    }
})();
