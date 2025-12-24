/**
 * Example: Error Handling and Custom Error Logger
 * 
 * This example demonstrates:
 * - Setting up custom error handlers
 * - Intercepting errors before they're thrown
 * - Logging errors to external services
 * - Graceful error handling in form creation
 */

import {
  createForm,
  addField,
  createTextField,
  createSliderField,
  setErrorHandler,
  getErrorHandler,
} from '../../lib/src/index';

// Custom error logger
class FormErrorLogger {
  private errors: Array<{ timestamp: Date; error: Error }> = [];

  log(error: Error) {
    this.errors.push({
      timestamp: new Date(),
      error,
    });
    console.error(`[${new Date().toISOString()}] Form Error:`, error.message);
    // In production, send to your error tracking service:
    // sendToSentry(error);
    // sendToDatadog(error);
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }
}

const logger = new FormErrorLogger();

// Set up error handler
setErrorHandler((error) => {
  logger.log(error);
});

console.log('Error Handler Example');
console.log('====================\n');

// Example 1: Handle invalid form ID
console.log('1. Attempting to create form with empty ID...');
try {
  const invalidForm = createForm('');
} catch (error) {
  console.log('   ✓ Error was logged and caught\n');
}

// Example 2: Handle missing required parameters
console.log('2. Attempting to create slider without min/max...');
try {
  let form = createForm('test-form');
  // @ts-ignore - intentionally passing invalid params
  form = addField(form, createSliderField('volume', 'Volume', {}));
} catch (error) {
  console.log('   ✓ Error was logged and caught\n');
}

// Example 3: Successful form creation
console.log('3. Creating valid form...');
let validForm = createForm('valid-form', { title: 'Valid Form' });
validForm = addField(validForm, createTextField('name', 'Name', { minLength: 1 }));
console.log('   ✓ Form created successfully\n');

// Show logged errors
console.log('Logged Errors:');
console.log('==============');
logger.getErrors().forEach((entry, index) => {
  console.log(`${index + 1}. [${entry.timestamp.toISOString()}] ${entry.error.message}`);
});

// Clean up
setErrorHandler(null);
console.log('\n✓ Error handler removed');
