/**
 * @wearehere-labs/generic-form-format
 * 
 * TypeScript library for dynamically creating Generic Form Format (GFF) form definitions.
 * Part of the Generic Form Format specification: https://github.com/wearehere-labs/generic-form-format
 */

// Export all types
export * from './types';

// Export error handler functions
export {
  setErrorHandler,
  getErrorHandler,
  type ErrorHandler,
} from './errorHandler';

// Export form management functions
export {
  createForm,
  addField,
  removeField,
  getField,
  updateField,
  addDependency,
  removeDependency,
  addFunction,
  removeFunction,
  mergeForms,
  toJSON,
  fromJSON,
} from './form';

// Export field creation helpers
export {
  createTextField,
  createTextareaField,
  createNumberField,
  createCheckboxField,
  createRadioField,
  createSelectField,
  createDateField,
  createTimeField,
  createDateTimeField,
  createFileField,
  createEmailField,
  createURLField,
  createTelField,
  createPasswordField,
  createRangeField,
  createColorField,
  createNestedField,
  createHiddenField,
  createRatingField,
  createToggleField,
  createTagsField,
  createAutocompleteField,
  createSliderField,
  createSignatureField,
  createRichtextField,
  createCodeField,
  createCurrencyField,
  createImageField,
  createOTPField,
  createOption,
  createOptions,
} from './fields';

// Export dependency and condition helpers
export {
  createCondition,
  createCompoundCondition,
  createEffect,
  showEffect,
  hideEffect,
  enableEffect,
  disableEffect,
  requireEffect,
  unrequireEffect,
  updateParamsEffect,
  setValueEffect,
  clearValueEffect,
  createDependency,
  createFunctionDef,
  createDatasourceFunction,
  createValidatorFunction,
  createTransformerFunction,
} from './helpers';
