import {
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
} from '../fields';

describe('Field Creators - Default Parameters', () => {
  test('createTextField with empty params', () => {
    const field = createTextField('test', 'Test');
    expect(field.type).toBe('text');
    expect(field.params).toEqual({});
  });

  test('createTextareaField with empty params', () => {
    const field = createTextareaField('test', 'Test');
    expect(field.type).toBe('textarea');
    expect(field.params).toEqual({});
  });

  test('createNumberField with empty params', () => {
    const field = createNumberField('test', 'Test');
    expect(field.type).toBe('number');
  });

  test('createCheckboxField with empty params', () => {
    const field = createCheckboxField('test', 'Test');
    expect(field.type).toBe('checkbox');
    expect(field.params).toEqual({});
  });

  test('createDateField with empty params', () => {
    const field = createDateField('test', 'Test');
    expect(field.type).toBe('date');
  });

  test('createTimeField with empty params', () => {
    const field = createTimeField('test', 'Test');
    expect(field.type).toBe('time');
  });

  test('createDateTimeField with empty params', () => {
    const field = createDateTimeField('test', 'Test');
    expect(field.type).toBe('datetime');
  });

  test('createFileField with empty params', () => {
    const field = createFileField('test', 'Test');
    expect(field.type).toBe('file');
  });

  test('createEmailField with empty params', () => {
    const field = createEmailField('test', 'Test');
    expect(field.type).toBe('email');
  });

  test('createURLField with empty params', () => {
    const field = createURLField('test', 'Test');
    expect(field.type).toBe('url');
  });

  test('createTelField with empty params', () => {
    const field = createTelField('test', 'Test');
    expect(field.type).toBe('tel');
  });

  test('createPasswordField with empty params', () => {
    const field = createPasswordField('test', 'Test');
    expect(field.type).toBe('password');
  });

  test('createRangeField with empty params', () => {
    const field = createRangeField('test', 'Test');
    expect(field.type).toBe('range');
  });

  test('createColorField with empty params', () => {
    const field = createColorField('test', 'Test');
    expect(field.type).toBe('color');
  });

  test('createHiddenField with empty params', () => {
    const field = createHiddenField('test');
    expect(field.type).toBe('hidden');
  });

  test('createRatingField with empty params', () => {
    const field = createRatingField('test', 'Test');
    expect(field.type).toBe('rating');
  });

  test('createToggleField with empty params', () => {
    const field = createToggleField('test', 'Test');
    expect(field.type).toBe('toggle');
  });

  test('createTagsField with empty params', () => {
    const field = createTagsField('test', 'Test');
    expect(field.type).toBe('tags');
  });

  test('createAutocompleteField with empty params', () => {
    const field = createAutocompleteField('test', 'Test');
    expect(field.type).toBe('autocomplete');
    expect(field.params).toMatchObject({
      minChars: 1,
      maxResults: 10,
      allowCustom: false,
      caseSensitive: false,
    });
  });

  test('createSignatureField with empty params', () => {
    const field = createSignatureField('test', 'Test');
    expect(field.type).toBe('signature');
    expect(field.params).toMatchObject({
      width: 400,
      height: 200,
      format: 'png',
    });
  });

  test('createRichtextField with empty params', () => {
    const field = createRichtextField('test', 'Test');
    expect(field.type).toBe('richtext');
    expect(field.params).toMatchObject({
      allowImages: false,
      allowLinks: true,
      allowTables: false,
    });
  });

  test('createCodeField with empty params', () => {
    const field = createCodeField('test', 'Test');
    expect(field.type).toBe('code');
    expect(field.params).toMatchObject({
      language: 'javascript',
      theme: 'light',
      lineNumbers: true,
      readOnly: false,
    });
  });

  test('createCurrencyField with empty params', () => {
    const field = createCurrencyField('test', 'Test');
    expect(field.type).toBe('currency');
    expect(field.params).toMatchObject({
      currency: 'USD',
      locale: 'en-US',
      precision: 2,
      allowNegative: false,
    });
  });

  test('createImageField with empty params', () => {
    const field = createImageField('test', 'Test');
    expect(field.type).toBe('image');
    expect(field.params).toMatchObject({
      maxSize: 5242880,
      multiple: false,
      preview: true,
      allowCrop: false,
      allowResize: false,
    });
  });

  test('createOTPField with empty params', () => {
    const field = createOTPField('test', 'Test');
    expect(field.type).toBe('otp');
    expect(field.params).toMatchObject({
      length: 6,
      type: 'numeric',
      mask: false,
      autoSubmit: false,
    });
  });
});
