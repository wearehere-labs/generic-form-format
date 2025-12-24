/**
 * Advanced Form Features Example
 * 
 * This example demonstrates:
 * - New field types (autocomplete, slider, signature, richtext, code, currency, image, otp)
 * - Advanced field configurations (accessibility, styling, grouping)
 * - Multi-step forms
 * - Field groups
 * - Theme customization
 * - Internationalization
 */

import {
  createForm,
  createAutocompleteField,
  createSliderField,
  createSignatureField,
  createRichtextField,
  createCodeField,
  createCurrencyField,
  createImageField,
  createOTPField,
  createTextField,
  createEmailField,
  createTextareaField,
  createSelectField,
  createCheckboxField,
  createOptions,
} from '../../lib/src/index';

// Create a multi-step form with theme and i18n
const advancedForm = createForm('advanced-form', {
  title: 'Advanced Form Demo',
  version: '1.0.0',
  metadata: {
    author: 'Form Builder Team',
    createdAt: new Date().toISOString(),
    tags: ['advanced', 'multi-step', 'verification', 'i18n'],
    category: 'Application',
  },
});

// Configure form settings
advancedForm.settings = {
  allowSave: true,
  allowReset: true,
  showProgress: true,
  validateOnChange: false,
  validateOnBlur: true,
  autoFocus: true,
  scrollToError: true,
  saveButton: {
    label: 'Save Draft',
    position: 'bottom-left',
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    hidden: false,
    icon: 'save',
    ariaLabel: 'Save form as draft',
  },
  submitButton: {
    label: 'Submit Application',
    position: 'bottom-right',
    variant: 'primary',
    size: 'large',
    disabled: false,
    hidden: false,
    icon: 'send',
    ariaLabel: 'Submit the form',
  },
  resetButton: {
    label: 'Clear Form',
    position: 'bottom-center',
    variant: 'danger',
    size: 'small',
    disabled: false,
    hidden: false,
    icon: 'trash',
    ariaLabel: 'Clear all form fields',
  },
};

// Configure theme
advancedForm.theme = {
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  errorColor: '#dc3545',
  successColor: '#28a745',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '16px',
  borderRadius: '8px',
  spacing: 'medium',
};

// Configure internationalization
advancedForm.i18n = {
  locale: 'en-US',
  direction: 'ltr',
  translations: {
    'en-US': {
      'form.title': 'Advanced Form Demo',
      'form.submit': 'Submit Application',
      'form.save': 'Save Draft',
      'form.reset': 'Clear Form',
      'validation.required': 'This field is required',
      'validation.email': 'Please enter a valid email address',
    },
    'es-ES': {
      'form.title': 'Formulario Avanzado',
      'form.submit': 'Enviar Solicitud',
      'form.save': 'Guardar Borrador',
      'form.reset': 'Limpiar Formulario',
      'validation.required': 'Este campo es obligatorio',
      'validation.email': 'Por favor ingrese un correo electrónico válido',
    },
  },
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  currency: 'USD',
};

// Define multi-step structure
advancedForm.steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: ['fullName', 'email', 'country', 'profilePicture'],
    validation: { validateOnNext: true },
  },
  {
    id: 'preferences',
    title: 'Preferences & Skills',
    description: 'Configure your preferences',
    fields: ['skillLevel', 'favoriteLanguage', 'bio', 'skills'],
    validation: { validateOnNext: true },
  },
  {
    id: 'verification',
    title: 'Verification',
    description: 'Verify your identity',
    fields: ['otp', 'signature'],
    validation: { validateOnNext: true },
  },
  {
    id: 'budget',
    title: 'Budget Information',
    description: 'Financial details',
    fields: ['budget', 'terms'],
  },
];

// Define field groups
advancedForm.groups = [
  {
    id: 'identity',
    title: 'Identity Verification',
    description: 'Verify your identity to proceed',
    fields: ['otp', 'signature'],
    collapsed: false,
    collapsible: true,
  },
  {
    id: 'skills',
    title: 'Skills & Expertise',
    description: 'Tell us about your technical skills',
    fields: ['skillLevel', 'favoriteLanguage', 'skills'],
    collapsed: false,
    collapsible: false,
  },
];

// Step 1: Personal Information with advanced configurations
advancedForm.fields.push(
  createTextField(
    'fullName',
    'Full Name',
    { minLength: 2, maxLength: 100 },
    {
      required: true,
      placeholder: 'Enter your full name',
      helpText: 'Please enter your first and last name',
      prefix: '👤',
      tabIndex: 1,
      autocomplete: 'name',
      ariaLabel: 'Enter your full name',
      ariaDescribedBy: 'fullName-help',
      cssClasses: ['form-field', 'text-input', 'required'],
      dataAttributes: { testid: 'fullName-input', track: 'user-name' },
      validation: {
        type: 'text',
        required: true,
        pattern: '^[a-zA-Z\\s]{2,100}$',
        customMessage: 'Please enter a valid name with 2-100 characters',
      },
    }
  )
);

advancedForm.fields.push(
  createEmailField(
    'email',
    'Email Address',
    { domain: '@company.com' },
    {
      required: true,
      placeholder: 'you@example.com',
      helpText: 'We will send verification to this email',
      prefix: '📧',
      tabIndex: 2,
      autocomplete: 'email',
      ariaLabel: 'Enter your email address',
      validation: {
        type: 'email',
        required: true,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      },
    }
  )
);

advancedForm.fields.push(
  createAutocompleteField(
    'country',
    'Country',
    {
      options: [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'Germany',
        'France',
        'Spain',
        'Italy',
        'Japan',
        'Brazil',
      ],
      minChars: 2,
      maxResults: 5,
      allowCustom: false,
      caseSensitive: false,
      debounce: 300,
    },
    {
      required: true,
      placeholder: 'Start typing your country...',
      helpText: 'Begin typing to see suggestions',
      prefix: '🌍',
      tabIndex: 3,
      autocomplete: 'country',
      ariaLabel: 'Select your country',
      validation: { type: 'text', required: true },
    }
  )
);

advancedForm.fields.push(
  createImageField(
    'profilePicture',
    'Profile Picture',
    {
      maxSize: 2097152, // 2MB
      acceptedFormats: ['.jpg', '.jpeg', '.png'],
      multiple: false,
      preview: true,
      allowCrop: true,
      allowResize: true,
      aspectRatio: '1:1',
      minWidth: 200,
      minHeight: 200,
      maxWidth: 1000,
      maxHeight: 1000,
    },
    {
      required: false,
      helpText: 'Upload a profile picture (max 2MB, square format recommended)',
      tabIndex: 4,
      ariaLabel: 'Upload profile picture',
      cssClasses: ['image-upload'],
    }
  )
);

// Step 2: Preferences & Skills
advancedForm.fields.push(
  createSliderField(
    'skillLevel',
    'Technical Skill Level',
    {
      min: 0,
      max: 10,
      step: 1,
      showValue: true,
      showTicks: true,
      tickLabels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      vertical: false,
      range: false,
      tooltip: true,
    },
    {
      defaultValue: 5,
      helpText: 'Rate your overall technical expertise (0-10)',
      tabIndex: 5,
      ariaLabel: 'Select your skill level from 0 to 10',
      group: 'skills',
      cssClasses: ['slider-field'],
    }
  )
);

advancedForm.fields.push(
  createCodeField(
    'favoriteLanguage',
    'Favorite Code Snippet',
    {
      language: 'javascript',
      theme: 'vs-dark',
      lineNumbers: true,
      readOnly: false,
      wordWrap: true,
      minimap: false,
      fontSize: 14,
      tabSize: 2,
    },
    {
      required: false,
      helpText: 'Paste your favorite code snippet',
      placeholder: 'console.log("Hello, World!");',
      tabIndex: 6,
      ariaLabel: 'Enter your favorite code snippet',
      group: 'skills',
      cssClasses: ['code-editor'],
    }
  )
);

advancedForm.fields.push(
  createRichtextField(
    'bio',
    'Professional Bio',
    {
      toolbar: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        'bulletList',
        'numberedList',
        'blockquote',
        'heading',
      ],
      allowImages: false,
      allowLinks: true,
      allowTables: false,
      maxLength: 1000,
      placeholder: 'Tell us about yourself...',
    },
    {
      required: true,
      helpText: 'Describe your professional background (max 1000 characters)',
      tabIndex: 7,
      ariaLabel: 'Enter your professional bio',
      validation: {
        type: 'text',
        required: true,
        minLength: 50,
        maxLength: 1000,
      },
    }
  )
);

advancedForm.fields.push(
  createTextareaField(
    'skills',
    'Technical Skills',
    { rows: 4, maxLength: 500 },
    {
      required: true,
      placeholder: 'List your technical skills, separated by commas',
      helpText: 'E.g., JavaScript, TypeScript, React, Node.js, Python',
      tabIndex: 8,
      group: 'skills',
      validation: {
        type: 'text',
        required: true,
        minLength: 10,
      },
    }
  )
);

// Step 3: Verification
advancedForm.fields.push(
  createOTPField(
    'otp',
    'Verification Code',
    {
      length: 6,
      type: 'numeric',
      mask: false,
      autoSubmit: true,
      separator: '-',
      separatorInterval: 3,
    },
    {
      required: true,
      helpText: 'Enter the 6-digit code sent to your email',
      tabIndex: 9,
      ariaLabel: 'Enter 6-digit verification code',
      group: 'identity',
      cssClasses: ['otp-input'],
      validation: {
        type: 'text',
        required: true,
        pattern: '^\\d{6}$',
        customMessage: 'Please enter a valid 6-digit code',
      },
    }
  )
);

advancedForm.fields.push(
  createSignatureField(
    'signature',
    'Digital Signature',
    {
      width: 500,
      height: 200,
      penColor: '#000000',
      backgroundColor: '#f8f9fa',
      penWidth: 2,
      format: 'png',
      clearButton: true,
    },
    {
      required: true,
      helpText: 'Sign using your mouse or touchscreen',
      tabIndex: 10,
      ariaLabel: 'Draw your signature',
      group: 'identity',
      cssClasses: ['signature-pad'],
      validation: {
        type: 'file',
        required: true,
        customMessage: 'Please provide your signature',
      },
    }
  )
);

// Step 4: Budget Information
advancedForm.fields.push(
  createCurrencyField(
    'budget',
    'Project Budget',
    {
      currency: 'USD',
      locale: 'en-US',
      precision: 2,
      allowNegative: false,
      min: 1000,
      max: 1000000,
      symbol: '$',
      symbolPosition: 'prefix',
      thousandsSeparator: ',',
      decimalSeparator: '.',
    },
    {
      required: true,
      placeholder: '0.00',
      helpText: 'Enter your estimated project budget in USD',
      prefix: '💰',
      suffix: 'USD',
      tabIndex: 11,
      ariaLabel: 'Enter project budget in US dollars',
      validation: {
        type: 'number',
        required: true,
        min: 1000,
        max: 1000000,
        customMessage: 'Budget must be between $1,000 and $1,000,000',
      },
    }
  )
);

advancedForm.fields.push(
  createCheckboxField(
    'terms',
    'I agree to the terms and conditions',
    { checked: false },
    {
      required: true,
      tabIndex: 12,
      ariaLabel: 'Agree to terms and conditions',
      validation: {
        type: 'boolean',
        required: true,
        customMessage: 'You must agree to the terms to proceed',
      },
    }
  )
);

// Output the form
console.log('Advanced Form with New Field Types and Configurations:');
console.log('='.repeat(60));
console.log(JSON.stringify(advancedForm, null, 2));

// Summary
console.log('\n' + '='.repeat(60));
console.log('Form Summary:');
console.log('- Total Fields:', advancedForm.fields.length);
console.log('- Total Steps:', advancedForm.steps?.length || 0);
console.log('- Total Groups:', advancedForm.groups?.length || 0);
console.log('- Theme Configured:', !!advancedForm.theme);
console.log('- I18n Configured:', !!advancedForm.i18n);
console.log('- Settings Configured:', !!advancedForm.settings);

console.log('\nNew Field Types Demonstrated:');
console.log('✓ Autocomplete (country)');
console.log('✓ Slider (skillLevel)');
console.log('✓ Signature (signature)');
console.log('✓ Rich Text (bio)');
console.log('✓ Code Editor (favoriteLanguage)');
console.log('✓ Currency (budget)');
console.log('✓ Image Upload (profilePicture)');
console.log('✓ OTP (otp)');

console.log('\nAdvanced Features:');
console.log('✓ Multi-step form with 4 steps');
console.log('✓ Field groups for organization');
console.log('✓ Custom theme colors and styling');
console.log('✓ Internationalization with translations');
console.log('✓ Accessibility attributes (ARIA labels, tab order)');
console.log('✓ Custom styling (CSS classes, data attributes)');
console.log('✓ Field prefixes, suffixes, and help text');
console.log('✓ Advanced validation rules');
console.log('✓ Button customization');
console.log('='.repeat(60));
