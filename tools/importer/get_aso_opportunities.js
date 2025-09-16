#!/usr/bin/env node

/**
 * Configuration for the ASO API
 */
const CONFIG = {
  baseUrl: 'https://spacecat.experiencecloud.live/api/v1',
  siteId: '6cabfe44-5bfd-4dd9-950e-40cbdd11d43a',
  apiKey: process.env.SITES_OPTIMIZER_API_TOKEN,
};

/**
 * Fetches ASO opportunities from the Sites Optimizer API
 * @param {string} apiKey - The API key for authentication
 * @param {string} siteId - The site ID
 * @returns {Promise<Object>} The opportunities data
 */
async function getAsoOpportunities(apiKey, siteId) {
  if (!apiKey) {
    throw new Error('SITES_OPTIMIZER_API_TOKEN environment variable is required');
  }

  const url = `${CONFIG.baseUrl}/sites/${siteId}/opportunities`;
  
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetches a specific opportunity by ID
 * @param {string} apiKey - The API key for authentication
 * @param {string} siteId - The site ID
 * @param {string} opportunityId - The opportunity ID
 * @returns {Promise<Object>} The opportunity data
 */
async function getOpportunityById(apiKey, siteId, opportunityId) {
  if (!apiKey) {
    throw new Error('SITES_OPTIMIZER_API_TOKEN environment variable is required');
  }

  const url = `${CONFIG.baseUrl}/sites/${siteId}/opportunities/${opportunityId}`;
  
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetches suggestions for a specific opportunity
 * @param {string} apiKey - The API key for authentication
 * @param {string} siteId - The site ID
 * @param {string} opportunityId - The opportunity ID
 * @returns {Promise<Array>} The suggestions data
 */
async function getOpportunitySuggestions(apiKey, siteId, opportunityId) {
  if (!apiKey) {
    throw new Error('SITES_OPTIMIZER_API_TOKEN environment variable is required');
  }

  const url = `${CONFIG.baseUrl}/sites/${siteId}/opportunities/${opportunityId}/suggestions`;
  
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Filters opportunities by type
 * @param {Array} opportunities - Array of opportunities
 * @param {string} type - The type to filter by
 * @returns {Array} Filtered opportunities
 */
function filterOpportunitiesByType(opportunities, type) {
  return opportunities.filter(opportunity => opportunity.type === type);
}

/**
 * Transforms suggestions array into summarized format
 * @param {Array} suggestions - Array of suggestion objects
 * @returns {Array} Summarized suggestions
 */
function summarizeSuggestions(suggestions) {
  return suggestions.map(suggestion => {
    if (!suggestion.data.urlsSuggested || suggestion.data.urlsSuggested.length === 0) {
      throw new Error(`No suggested URLs found for suggestion ${suggestion.id}. Referrer: ${suggestion.data.urlFrom}, Broken path: ${suggestion.data.urlTo}`);
    }
    
    return {
      referrer: `${suggestion.data.urlFrom}`,
      old_path: suggestion.data.urlTo,
      new_path: suggestion.data.urlsSuggested[0]
    };
  });
}

/**
 * Main function to run the script
 */
async function main() {
  
  // Fetch all opportunities
  const allOpportunities = await getAsoOpportunities(
    CONFIG.apiKey,
    CONFIG.siteId,
  );
  
  
  // Display all opportunities
  
  // Filter for broken-internal-links type
  const brokenLinkOpportunities = filterOpportunitiesByType(allOpportunities, 'broken-internal-links');
  
  
  if (brokenLinkOpportunities.length === 0) {
    return { opportunities: allOpportunities, suggestions: [] };
  }
  
  // Fetch detailed information and suggestions for each broken-internal-links opportunity
  const detailedOpportunities = [];
  const allSuggestions = [];
  
  for (const opportunity of brokenLinkOpportunities) {
    
    // Fetch opportunity details
    const details = await getOpportunityById(
      CONFIG.apiKey,
      CONFIG.siteId,
      opportunity.id
    );
    detailedOpportunities.push(details);
    
    // Fetch suggestions for this opportunity
    const suggestions = await getOpportunitySuggestions(
      CONFIG.apiKey,
      CONFIG.siteId,
      opportunity.id
    );
    
    if (suggestions && suggestions.length > 0) {
      allSuggestions.push({
        opportunityId: opportunity.id,
        suggestions: suggestions
      });
    } else {
    }
  }
  
  // Display detailed broken-internal-links opportunities
  
  // Display suggestions
  
  allSuggestions.forEach(({ opportunityId, suggestions }) => {
    suggestions.forEach((suggestion, index) => {
    });
  });
  
  // Display summarized suggestions
  const allSuggestionsFlat = allSuggestions.flatMap(({ suggestions }) => suggestions);
  const summarizedSuggestions = summarizeSuggestions(allSuggestionsFlat);
  console.log(JSON.stringify(summarizedSuggestions, null, 2));
  
  
  return { 
    allOpportunities: allOpportunities, 
    detailedOpportunities: detailedOpportunities, 
    suggestions: allSuggestions,
    summarizedSuggestions: summarizedSuggestions
  };
}

main();
