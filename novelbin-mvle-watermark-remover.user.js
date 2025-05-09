// ==UserScript==
// @name         Novelbin - My Virtual Library Watermark Remover
// @namespace    https://github.com/InvictusNavarchus/novelbin-mvle-watermark-remover
// @downloadURL  https://raw.githubusercontent.com/InvictusNavarchus/novelbin-mvle-watermark-remover/master/novelbin-mvle-watermark-remover.user.js
// @updateURL    https://raw.githubusercontent.com/InvictusNavarchus/novelbin-mvle-watermark-remover/master/novelbin-mvle-watermark-remover.user.js
// @version      0.1.0
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
    
    const DEBUG = false;
    
    /**
     * Removes paragraphs containing "My Virtual Library" text
     */
    function removeWatermarks() {
        // Target the chapter content container or fall back to body
        const contentContainer = document.getElementById('chr-content') || document.body;
        
        // Find all paragraphs
        const paragraphs = contentContainer.querySelectorAll('p');
        let removedCount = 0;
        
        // Remove paragraphs containing the watermark text
        paragraphs.forEach(paragraph => {
            if (paragraph.textContent.includes('My Virtual Library')) {
                if (DEBUG) {
                    console.log('[MVL Remover] Removed watermark:', paragraph.textContent.trim());
                }
                paragraph.remove();
                removedCount++;
            }
        });
        
        if (removedCount > 0 && DEBUG) {
            console.log(`[MVL Remover] Removed ${removedCount} watermark paragraphs`);
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
