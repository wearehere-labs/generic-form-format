import {
  Field,
  TextFieldParams,
  TextareaFieldParams,
  NumberFieldParams,
  CheckboxFieldParams,
  RadioFieldParams,
  SelectFieldParams,
  DateFieldParams,
  TimeFieldParams,
  DateTimeFieldParams,
  FileFieldParams,
  EmailFieldParams,
  URLFieldParams,
  TelFieldParams,
  PasswordFieldParams,
  RangeFieldParams,
  ColorFieldParams,
  NestedFieldParams,
  HiddenFieldParams,
  RatingFieldParams,
  ToggleFieldParams,
  TagsFieldParams,
  AutocompleteFieldParams,
  SliderFieldParams,
  SignatureFieldParams,
  RichtextFieldParams,
  CodeFieldParams,
  CurrencyFieldParams,
  ImageFieldParams,
  OTPFieldParams,
  LayoutConfig,
  ValidationConfig,
  OptionObject,
} from './types';
import { throwFormCreationError } from './errorHandler';

interface BaseFieldOptions {
  tooltip?: string;
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

/**
 * Creates a text field
 */
export function createTextField(
  id: string,
  caption: string,
  params: TextFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'text',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a number field
 */
export function createNumberField(
  id: string,
  caption: string,
  params: NumberFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'number',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a checkbox field
 */
export function createCheckboxField(
  id: string,
  caption: string,
  params: CheckboxFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'checkbox',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a radio field
 */
export function createRadioField(
  id: string,
  caption: string,
  params: RadioFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.options && !params.optionsFunction) {
    throwFormCreationError('Radio field must have either options or optionsFunction');
  }
  return {
    id,
    type: 'radio',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a select field
 */
export function createSelectField(
  id: string,
  caption: string,
  params: SelectFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.options && !params.optionsFunction) {
    throwFormCreationError('Select field must have either options or optionsFunction');
  }
  return {
    id,
    type: 'select',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a date field
 */
export function createDateField(
  id: string,
  caption: string,
  params: DateFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'date',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a file field
 */
export function createFileField(
  id: string,
  caption: string,
  params: FileFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'file',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates an email field
 */
export function createEmailField(
  id: string,
  caption: string,
  params: EmailFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'email',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a URL field
 */
export function createURLField(
  id: string,
  caption: string,
  params: URLFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'url',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a password field
 */
export function createPasswordField(
  id: string,
  caption: string,
  params: PasswordFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'password',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a range field
 */
export function createRangeField(
  id: string,
  caption: string,
  params: RangeFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'range',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a color field
 */
export function createColorField(
  id: string,
  caption: string,
  params: ColorFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'color',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a nested form field
 */
export function createNestedField(
  id: string,
  caption: string,
  params: NestedFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.formId) {
    throwFormCreationError('Nested field must have a formId');
  }
  return {
    id,
    type: 'nested',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a textarea field for multi-line text
 */
export function createTextareaField(
  id: string,
  caption: string,
  params: TextareaFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'textarea',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a time picker field
 */
export function createTimeField(
  id: string,
  caption: string,
  params: TimeFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'time',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a datetime picker field
 */
export function createDateTimeField(
  id: string,
  caption: string,
  params: DateTimeFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'datetime',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a telephone/phone number field
 */
export function createTelField(
  id: string,
  caption: string,
  params: TelFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'tel',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a hidden field
 */
export function createHiddenField(
  id: string,
  params: HiddenFieldParams = {},
  options?: Omit<BaseFieldOptions, 'tooltip' | 'layout'>
): Field {
  return {
    id,
    type: 'hidden',
    caption: '',
    params,
    ...options,
  };
}

/**
 * Creates a rating field (stars, hearts, etc.)
 */
export function createRatingField(
  id: string,
  caption: string,
  params: RatingFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'rating',
    caption,
    params: {
      max: 5,
      min: 0,
      step: 1,
      icon: 'star',
      allowHalf: false,
      allowClear: true,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a toggle switch field
 */
export function createToggleField(
  id: string,
  caption: string,
  params: ToggleFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'toggle',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a tags input field
 */
export function createTagsField(
  id: string,
  caption: string,
  params: TagsFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'tags',
    caption,
    params: {
      allowCustom: true,
      separator: ',',
      ...params,
    },
    ...options,
  };
}

/**
 * Creates an autocomplete field with suggestions
 */
export function createAutocompleteField(
  id: string,
  caption: string,
  params: AutocompleteFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'autocomplete',
    caption,
    params: {
      minChars: 1,
      maxResults: 10,
      allowCustom: false,
      caseSensitive: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a visual slider field
 */
export function createSliderField(
  id: string,
  caption: string,
  params: SliderFieldParams,
  options?: BaseFieldOptions
): Field {
  if (params.min === undefined || params.max === undefined) {
    throwFormCreationError('Slider field must have min and max values');
  }
  return {
    id,
    type: 'slider',
    caption,
    params: {
      step: 1,
      showValue: true,
      showTicks: false,
      vertical: false,
      range: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a signature pad field
 */
export function createSignatureField(
  id: string,
  caption: string,
  params: SignatureFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'signature',
    caption,
    params: {
      width: 400,
      height: 200,
      penColor: '#000000',
      backgroundColor: '#ffffff',
      format: 'png',
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a rich text editor field
 */
export function createRichtextField(
  id: string,
  caption: string,
  params: RichtextFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'richtext',
    caption,
    params: {
      toolbar: ['bold', 'italic', 'underline', 'link', 'bulletList', 'numberedList'],
      allowImages: false,
      allowLinks: true,
      allowTables: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a code editor field
 */
export function createCodeField(
  id: string,
  caption: string,
  params: CodeFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'code',
    caption,
    params: {
      language: 'javascript',
      theme: 'light',
      lineNumbers: true,
      readOnly: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates a currency input field
 */
export function createCurrencyField(
  id: string,
  caption: string,
  params: CurrencyFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'currency',
    caption,
    params: {
      currency: 'USD',
      locale: 'en-US',
      precision: 2,
      allowNegative: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates an image upload field with preview
 */
export function createImageField(
  id: string,
  caption: string,
  params: ImageFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'image',
    caption,
    params: {
      maxSize: 5242880, // 5MB
      acceptedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      multiple: false,
      preview: true,
      allowCrop: false,
      allowResize: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Creates an OTP/verification code field
 */
export function createOTPField(
  id: string,
  caption: string,
  params: OTPFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'otp',
    caption,
    params: {
      length: 6,
      type: 'numeric',
      mask: false,
      autoSubmit: false,
      ...params,
    },
    ...options,
  };
}

/**
 * Helper to create option objects for select/radio fields
 */
export function createOption(value: string | number, label: string): OptionObject {
  return { value, label };
}

/**
 * Helper to create multiple options at once
 */
export function createOptions(
  items: Array<string | { value: string | number; label: string }>
): OptionObject[] {
  return items.map((item) => {
    if (typeof item === 'string') {
      return { value: item, label: item };
    }
    return item;
  });
}
