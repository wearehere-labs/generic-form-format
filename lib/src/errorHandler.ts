/**
 * Error Handler Module
 * Allows users to intercept and handle errors from the library
 */

import { FormCreationError, DuplicateFieldError } from './types';

export type ErrorHandler = (error: Error) => void;

let globalErrorHandler: ErrorHandler | null = null;

/**
 * Set a global error handler to intercept all errors
 * @param handler - Function to handle errors
 */
export function setErrorHandler(handler: ErrorHandler | null): void {
  globalErrorHandler = handler;
}

/**
 * Get the current error handler
 * @returns The current error handler or null
 */
export function getErrorHandler(): ErrorHandler | null {
  return globalErrorHandler;
}

/**
 * Handle an error - calls the global error handler if set, then throws
 * @param error - The error to handle
 * @throws The error after handling
 */
export function handleError(error: Error): never {
  if (globalErrorHandler) {
    try {
      globalErrorHandler(error);
    } catch (handlerError) {
      // If the handler itself throws, we still want to throw the original error
      // Handler errors are silently ignored to prevent infinite loops
    }
  }
  throw error;
}

/**
 * Create and handle a FormCreationError
 * @param message - Error message
 * @throws FormCreationError
 */
export function throwFormCreationError(message: string): never {
  return handleError(new FormCreationError(message));
}

/**
 * Create and handle a DuplicateFieldError
 * @param fieldId - The duplicate field ID
 * @param message - Error message
 * @throws DuplicateFieldError
 */
export function throwDuplicateFieldError(fieldId: string, message: string): never {
  return handleError(new DuplicateFieldError(fieldId, message));
}
