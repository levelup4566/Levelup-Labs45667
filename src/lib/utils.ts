
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn - Utility function to merge tailwind classes with proper precedence
 * 
 * @param {...ClassValue[]} inputs - Class names to be merged
 * @returns {string} Merged class string with proper Tailwind specificity
 */
export function cn(...inputs: ClassValue[]): string {
  try {
    return twMerge(clsx(inputs));
  } catch (error) {
    console.error("Error merging classes:", error);
    // Fallback to basic class merging if twMerge fails
    return inputs.filter(Boolean).join(" ");
  }
}

/**
 * Safely parses JSON with error handling
 * 
 * @param {string} json - JSON string to parse
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {any} Parsed object or fallback value
 */
export function safeJsonParse(json: string, fallback: any = null): any {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("JSON parse error:", error);
    return fallback;
  }
}

/**
 * Debounce function to limit execution frequency
 * 
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Formats a number with proper thousands separators
 * 
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(value: number): string {
  try {
    return new Intl.NumberFormat().format(value);
  } catch (error) {
    console.error("Number format error:", error);
    return value.toString();
  }
}
