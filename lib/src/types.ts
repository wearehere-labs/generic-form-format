/**
 * Generic Form Format v1.0 Type Definitions
 * Based on https://github.com/wearehere-labs/generic-form-format
 */

// Root form definition
export interface FormDefinition {
  version: string;
  formId: string;
  title?: string;
  description?: string;
  fields: Field[];
  dependencies?: Dependency[];
  functions?: Record<string, FunctionDef>;
  metadata?: Record<string, any>;
  settings?: FormSettings;
  steps?: FormStep[];
  groups?: FieldGroup[];
  theme?: FormTheme;
  i18n?: I18nConfig;
}

export interface FormSettings {
  submitButton?: ButtonConfig;
  resetButton?: ButtonConfig;
  saveButton?: ButtonConfig;
  cancelButton?: ButtonConfig;
  showProgress?: boolean;
  allowSave?: boolean;
  allowReset?: boolean;
  allowDraft?: boolean;
  autoSave?: boolean;
  autoSaveInterval?: number;
  autoFocus?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  focusFirstError?: boolean;
  scrollToError?: boolean;
  confirmOnLeave?: boolean;
  submitOnEnter?: boolean;
}

export interface ButtonConfig {
  label?: string;
  position?: 'left' | 'center' | 'right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hidden?: boolean;
  icon?: string;
  ariaLabel?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  optional?: boolean;
  icon?: string;
  validation?: {
    validateOnNext?: boolean;
    validateOnPrevious?: boolean;
  };
}

export interface FieldGroup {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  collapsed?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

export interface FormTheme {
  primaryColor?: string;
  secondaryColor?: string;
  errorColor?: string;
  successColor?: string;
  warningColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  spacing?: 'compact' | 'normal' | 'comfortable' | 'medium';
}

export interface I18nConfig {
  locale?: string;
  direction?: 'ltr' | 'rtl';
  defaultLocale?: string;
  supportedLocales?: string[];
  translations?: Record<string, Record<string, string>>;
  dateFormat?: string;
  timeFormat?: '12h' | '24h' | string;
  numberFormat?: string;
  currency?: string;
  currencyFormat?: string;
}

// Field types
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'email'
  | 'url'
  | 'tel'
  | 'password'
  | 'range'
  | 'color'
  | 'nested'
  | 'hidden'
  | 'rating'
  | 'toggle'
  | 'tags'
  | 'autocomplete'
  | 'slider'
  | 'signature'
  | 'richtext'
  | 'code'
  | 'currency'
  | 'image'
  | 'otp';

// Field definition
export interface Field {
  id: string;
  type: FieldType;
  caption: string;
  tooltip?: string;
  params: FieldParams;
  layout?: LayoutConfig;
  validation?: ValidationConfig;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
  visible?: boolean;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  prefix?: string;
  suffix?: string;
  group?: string;
  tabIndex?: number;
  autocomplete?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  dataAttributes?: Record<string, string>;
  cssClasses?: string[];
  style?: Record<string, string>;
}

// Field parameters (union type)
export type FieldParams =
  | TextFieldParams
  | TextareaFieldParams
  | NumberFieldParams
  | CheckboxFieldParams
  | RadioFieldParams
  | SelectFieldParams
  | DateFieldParams
  | TimeFieldParams
  | DateTimeFieldParams
  | FileFieldParams
  | EmailFieldParams
  | URLFieldParams
  | TelFieldParams
  | PasswordFieldParams
  | RangeFieldParams
  | ColorFieldParams
  | NestedFieldParams
  | HiddenFieldParams
  | RatingFieldParams
  | ToggleFieldParams
  | TagsFieldParams
  | AutocompleteFieldParams
  | SliderFieldParams
  | SignatureFieldParams
  | RichtextFieldParams
  | CodeFieldParams
  | CurrencyFieldParams
  | ImageFieldParams
  | OTPFieldParams;

export interface TextFieldParams {
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
  rtl?: boolean;
  pattern?: string;
  placeholder?: string;
}

export interface TextareaFieldParams {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  rtl?: boolean;
  placeholder?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  required?: boolean;
}

export interface NumberFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  decimals?: number;
  step?: number;
}

export interface CheckboxFieldParams {
  required?: boolean;
  checked?: boolean;
}

export interface RadioFieldParams {
  required?: boolean;
  options?: string[] | OptionObject[];
  optionsFunction?: string;
}

export interface SelectFieldParams {
  required?: boolean;
  multiple?: boolean;
  options?: OptionObject[];
  optionsFunction?: string;
  searchable?: boolean;
  placeholder?: string;
}

export interface DateFieldParams {
  required?: boolean;
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export interface TimeFieldParams {
  required?: boolean;
  minTime?: string;
  maxTime?: string;
  step?: number;
  format?: '12h' | '24h';
  placeholder?: string;
}

export interface DateTimeFieldParams {
  required?: boolean;
  minDateTime?: string;
  maxDateTime?: string;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  placeholder?: string;
}

export interface FileFieldParams {
  required?: boolean;
  multiple?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
  acceptedMimeTypes?: string[];
}

export interface EmailFieldParams {
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
  domain?: string;
}

export interface URLFieldParams {
  required?: boolean;
  placeholder?: string;
}

export interface TelFieldParams {
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  countryCode?: string;
  format?: string;
}

export interface PasswordFieldParams {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
}

export interface RangeFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export interface ColorFieldParams {
  required?: boolean;
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl';
  defaultValue?: string;
}

export interface NestedFieldParams {
  formId: string;
  multiple?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface HiddenFieldParams {
  value?: any;
}

export interface RatingFieldParams {
  required?: boolean;
  max?: number;
  min?: number;
  step?: number;
  icon?: 'star' | 'heart' | 'thumb' | 'number';
  allowHalf?: boolean;
  allowClear?: boolean;
}

export interface ToggleFieldParams {
  required?: boolean;
  onLabel?: string;
  offLabel?: string;
  defaultValue?: boolean;
}

export interface TagsFieldParams {
  required?: boolean;
  maxTags?: number;
  allowCustom?: boolean;
  suggestions?: string[];
  placeholder?: string;
  separator?: string;
}

export interface AutocompleteFieldParams {
  required?: boolean;
  options?: string[] | OptionObject[];
  optionsFunction?: string;
  minChars?: number;
  maxResults?: number;
  placeholder?: string;
  allowCustom?: boolean;
  caseSensitive?: boolean;
  debounce?: number;
}

export interface SliderFieldParams {
  required?: boolean;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  showValue?: boolean;
  showTicks?: boolean;
  marks?: Record<number, string>;
  vertical?: boolean;
  range?: boolean;
  tooltip?: boolean;
  tickLabels?: string[];
}

export interface SignatureFieldParams {
  required?: boolean;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  format?: 'png' | 'jpg' | 'svg';
  maxSize?: number;
  penWidth?: number;
  clearButton?: boolean;
}

export interface RichtextFieldParams {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  toolbar?: string[];
  allowImages?: boolean;
  allowLinks?: boolean;
  allowTables?: boolean;
  placeholder?: string;
}

export interface CodeFieldParams {
  required?: boolean;
  language?: string;
  theme?: 'light' | 'dark' | 'vs-dark' | 'vs-light' | 'hc-black';
  lineNumbers?: boolean;
  readOnly?: boolean;
  minLines?: number;
  maxLines?: number;
  placeholder?: string;
  wordWrap?: boolean;
  minimap?: boolean;
  fontSize?: number;
  tabSize?: number;
}

export interface CurrencyFieldParams {
  required?: boolean;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  precision?: number;
  allowNegative?: boolean;
  placeholder?: string;
  symbol?: string;
  symbolPosition?: 'prefix' | 'suffix';
  thousandsSeparator?: string;
  decimalSeparator?: string;
}

export interface ImageFieldParams {
  required?: boolean;
  maxSize?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: string;
  allowCrop?: boolean;
  allowResize?: boolean;
  acceptedFormats?: string[];
  multiple?: boolean;
  preview?: boolean;
}

export interface OTPFieldParams {
  required?: boolean;
  length?: number;
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  mask?: boolean;
  autoSubmit?: boolean;
  placeholder?: string;
  separator?: string;
  separatorInterval?: number;
}

export interface OptionObject {
  value: string | number;
  label: string;
}

// Layout configuration
export interface LayoutConfig {
  width?: WidthConfig;
  order?: number;
  row?: number;
  column?: number;
  span?: number;
}

export interface WidthConfig {
  mobile?: WidthValue;
  tablet?: WidthValue;
  desktop?: WidthValue;
  wide?: WidthValue;
}

export type WidthValue =
  | 'full'
  | '15/16'
  | '7/8'
  | '14/16'
  | '13/16'
  | '3/4'
  | '12/16'
  | '11/16'
  | '5/8'
  | '10/16'
  | '9/16'
  | '1/2'
  | '8/16'
  | '7/16'
  | '3/8'
  | '6/16'
  | '5/16'
  | '1/4'
  | '4/16'
  | '3/16'
  | '1/8'
  | '2/16'
  | '1/16';

// Validation configuration
export interface ValidationConfig {
  type?: 'text' | 'number' | 'email' | 'url' | 'date' | 'time' | 'boolean' | 'file' | 'custom';
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customMessage?: string;
  custom?: CustomValidation[];
  crossField?: CrossFieldValidation[];
}

export interface CustomValidation {
  rule: string;
  message: string;
  params?: Record<string, any>;
}

export interface CrossFieldValidation {
  fields: string[];
  rule: string;
  message: string;
}

// Dependencies
export interface Dependency {
  id?: string;
  sourceFieldId: string;
  condition: Condition;
  effects: Effect[];
}

export interface Condition {
  operator: ConditionOperator;
  value?: any;
  sourceFieldId?: string;
  conditions?: Condition[];
}

export type ConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'matches'
  | 'in'
  | 'notIn'
  | 'and'
  | 'or'
  | 'not';

export interface Effect {
  targetFieldId: string;
  action: EffectAction;
  params?: Record<string, any>;
  value?: any;
}

export type EffectAction =
  | 'show'
  | 'hide'
  | 'enable'
  | 'disable'
  | 'require'
  | 'unrequire'
  | 'updateParams'
  | 'setValue'
  | 'clearValue';

// Functions
export interface FunctionDef {
  type: FunctionType;
  description?: string;
  params?: string[];
  returns?: string;
}

export type FunctionType = 'datasource' | 'validator' | 'transformer';

// Error types
export class FormCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormCreationError';
  }
}

export class DuplicateFieldError extends Error {
  constructor(fieldId: string, message: string) {
    super(`Field ID "${fieldId}" already exists: ${message}`);
    this.name = 'DuplicateFieldError';
  }
}
