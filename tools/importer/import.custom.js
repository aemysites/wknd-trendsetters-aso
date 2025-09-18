
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * A map of custom parser names to imported parser functions.
 *
 * eg.
 * {
 *   myParser: customParser1,
 * }
 */
export const customParsers = {};

/**
 * An array of custom page elements to parse.
 * The name is the parser name.
 * If the element is a string, it will be used as a selector to the element to parse.
 * If the element is not provided, the parser will be applied to the main element.
 *
 * eg.
 * [
 *   { name: 'myParser', element: 'selector' },
 * ]
 */
export const customElements = [];

import { TransformHook } from './transformers/transform.js';

async function brokenLinksTransformer(hookName, element, { document }) {
  console.log(`[BrokenLinks] Hook: ${hookName}`);
  
  if (hookName === TransformHook.beforeTransform) {
    console.log('[BrokenLinks] Starting transformation...');
    
    try {
      // Load the broken links mapping
      const response = await fetch('/tools/importer/broken_internal_links.json');
      const mapping = await response.json();
      
      console.log('[BrokenLinks] Loaded mapping:', mapping);
      
      const links = document.querySelectorAll('a[href]');
      console.log(`[BrokenLinks] Found ${links.length} links`);
      
      let transformedCount = 0;
      
      links.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`[BrokenLinks] Link ${index}: ${href}`);
        
        if (href) {
          // Check each mapping entry
          const brokenLink = mapping.find(({ old_path }) => {
            try {
              const url = new URL(href);
              const pathname = url.pathname;
              console.log(`[BrokenLinks] Pathname: ${pathname}`);
              return pathname === old_path;
            } catch (e) {
              // If it's not a valid URL, check if it's a relative path
              return href === old_path;
            }
          });
          
          if (brokenLink) {
            console.log(`[BrokenLinks] MATCH! Rewriting: ${href} -> ${brokenLink.new_path}`);
            
            try {
              const url = new URL(href);
              url.pathname = brokenLink.new_path;
              link.href = url.href;
              console.log(`[BrokenLinks] New href: ${link.href}`);
            } catch (e) {
              // If it's not a valid URL, treat as relative path
              link.href = brokenLink.new_path;
              console.log(`[BrokenLinks] New href: ${link.href}`);
            }
            
            transformedCount++;
          }
        }
      });
      
      console.log(`[BrokenLinks] Done! Transformed ${transformedCount} links`);
    } catch (error) {
      console.error('[BrokenLinks] Error loading mapping:', error);
    }
  }
}


/**
 * Custom transformers
 */
export const customTransformers = {
  brokenLinks: brokenLinksTransformer,
};
