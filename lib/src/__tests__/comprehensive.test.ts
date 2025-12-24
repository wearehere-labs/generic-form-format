import {
  setErrorHandler,
  getErrorHandler,
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
  createDependency,
  createCondition,
  showEffect,
  hideEffect,
  enableEffect,
  disableEffect,
  requireEffect,
  unrequireEffect,
  updateParamsEffect,
  FormCreationError,
  DuplicateFieldError,
} from '../index';

describe('Error Handler', () => {
  afterEach(() => {
    // Reset error handler after each test
    setErrorHandler(null);
  });

  test('setErrorHandler sets custom error handler', () => {
    const mockHandler = jest.fn();
    setErrorHandler(mockHandler);
    
    expect(getErrorHandler()).toBe(mockHandler);
  });

  test('custom error handler is called on error', () => {
    const mockHandler = jest.fn();
    setErrorHandler(mockHandler);

    try {
      createForm('');
    } catch (error) {
      // Error should still be thrown
    }

    expect(mockHandler).toHaveBeenCalledWith(expect.any(FormCreationError));
  });

  test('error is still thrown after handler is called', () => {
    const mockHandler = jest.fn();
    setErrorHandler(mockHandler);

    expect(() => createForm('')).toThrow(FormCreationError);
  });

  test('setErrorHandler can clear handler with null', () => {
    setErrorHandler(jest.fn());
    setErrorHandler(null);
    
    expect(getErrorHandler()).toBeNull();
  });

  test('handler errors are caught and original error still thrown', () => {
    const faultyHandler = jest.fn(() => {
      throw new Error('Handler failed');
    });
    setErrorHandler(faultyHandler);

    expect(() => createForm('')).toThrow(FormCreationError);
    expect(faultyHandler).toHaveBeenCalled();
  });

  test('getErrorHandler returns null when no handler is set', () => {
    setErrorHandler(null);
    expect(getErrorHandler()).toBeNull();
  });
});

describe('All Field Creators', () => {
  test('createTextareaField creates valid field', () => {
    const field = createTextareaField('notes', 'Notes', { rows: 5, maxLength: 1000 });
    expect(field.type).toBe('textarea');
    expect(field.id).toBe('notes');
    expect(field.params).toMatchObject({ rows: 5, maxLength: 1000 });
  });

  test('createDateField creates valid field', () => {
    const field = createDateField('birthdate', 'Birth Date', { 
      required: true,
      minDate: '1900-01-01' 
    });
    expect(field.type).toBe('date');
  });

  test('createTimeField creates valid field', () => {
    const field = createTimeField('appointmentTime', 'Appointment Time', { 
      format: '12h' 
    });
    expect(field.type).toBe('time');
  });

  test('createDateTimeField creates valid field', () => {
    const field = createDateTimeField('eventTime', 'Event Time', { 
      timeFormat: '24h' 
    });
    expect(field.type).toBe('datetime');
  });

  test('createFileField creates valid field', () => {
    const field = createFileField('upload', 'Upload File', { 
      multiple: true,
      maxSize: 5242880 
    });
    expect(field.type).toBe('file');
  });

  test('createURLField creates valid field', () => {
    const field = createURLField('website', 'Website', {});
    expect(field.type).toBe('url');
  });

  test('createTelField creates valid field', () => {
    const field = createTelField('phone', 'Phone', { countryCode: '+1' });
    expect(field.type).toBe('tel');
  });

  test('createPasswordField creates valid field', () => {
    const field = createPasswordField('password', 'Password', { 
      minLength: 8,
      requireUppercase: true 
    });
    expect(field.type).toBe('password');
  });

  test('createRangeField creates valid field', () => {
    const field = createRangeField('volume', 'Volume', { 
      min: 0,
      max: 100,
      step: 5 
    });
    expect(field.type).toBe('range');
  });

  test('createColorField creates valid field', () => {
    const field = createColorField('themeColor', 'Theme Color', { 
      format: 'hex' 
    });
    expect(field.type).toBe('color');
  });

  test('createHiddenField creates valid field without caption', () => {
    const field = createHiddenField('userId', { value: '12345' });
    expect(field.type).toBe('hidden');
    expect(field.caption).toBe('');
  });

  test('createRatingField creates valid field', () => {
    const field = createRatingField('rating', 'Rate Us', { 
      max: 5,
      icon: 'star' 
    });
    expect(field.type).toBe('rating');
  });

  test('createToggleField creates valid field', () => {
    const field = createToggleField('notifications', 'Notifications', { 
      onLabel: 'On',
      offLabel: 'Off' 
    });
    expect(field.type).toBe('toggle');
  });

  test('createTagsField creates valid field', () => {
    const field = createTagsField('interests', 'Interests', { 
      maxTags: 5,
      allowCustom: true 
    });
    expect(field.type).toBe('tags');
  });

  test('createAutocompleteField creates valid field', () => {
    const field = createAutocompleteField('city', 'City', { 
      options: ['New York', 'Los Angeles', 'Chicago'] 
    });
    expect(field.type).toBe('autocomplete');
  });

  test('createSignatureField creates valid field', () => {
    const field = createSignatureField('signature', 'Signature', { 
      width: 400,
      height: 200 
    });
    expect(field.type).toBe('signature');
  });

  test('createRichtextField creates valid field', () => {
    const field = createRichtextField('bio', 'Bio', { 
      toolbar: ['bold', 'italic'],
      maxLength: 1000 
    });
    expect(field.type).toBe('richtext');
  });

  test('createCodeField creates valid field', () => {
    const field = createCodeField('code', 'Code', { 
      language: 'python',
      theme: 'dark' 
    });
    expect(field.type).toBe('code');
  });

  test('createCurrencyField creates valid field', () => {
    const field = createCurrencyField('budget', 'Budget', { 
      currency: 'USD',
      precision: 2 
    });
    expect(field.type).toBe('currency');
  });

  test('createImageField creates valid field', () => {
    const field = createImageField('avatar', 'Avatar', { 
      maxSize: 2097152,
      preview: true 
    });
    expect(field.type).toBe('image');
  });

  test('createOTPField creates valid field', () => {
    const field = createOTPField('otp', 'Verification Code', { 
      length: 6,
      type: 'numeric' 
    });
    expect(field.type).toBe('otp');
  });

  test('createRadioField throws without options or optionsFunction', () => {
    expect(() => 
      createRadioField('choice', 'Choice', {} as any)
    ).toThrow(FormCreationError);
  });

  test('createRadioField works with optionsFunction', () => {
    const field = createRadioField('choice', 'Choice', { 
      optionsFunction: 'getOptions' 
    });
    expect(field.type).toBe('radio');
  });

  test('createSelectField works with optionsFunction', () => {
    const field = createSelectField('choice', 'Choice', { 
      optionsFunction: 'getOptions' 
    });
    expect(field.type).toBe('select');
  });

  test('createNestedField throws without formId', () => {
    expect(() => 
      createNestedField('nested', 'Nested', {} as any)
    ).toThrow(FormCreationError);
  });

  test('createNestedField works with formId', () => {
    const field = createNestedField('address', 'Address', { formId: 'address-form' });
    expect(field.type).toBe('nested');
  });

  test('createSliderField throws without min and max', () => {
    expect(() => 
      createSliderField('slider', 'Slider', {} as any)
    ).toThrow(FormCreationError);
  });
});

describe('Helper Functions', () => {
  test('createOption creates option object', () => {
    const option = createOption('value1', 'label1');
    expect(option).toEqual({ value: 'value1', label: 'label1' });
  });

  test('createDependency creates dependency', () => {
    const dep = createDependency(
      'field1',
      createCondition('equals', 'test'),
      [showEffect('field2')]
    );
    
    expect(dep.sourceFieldId).toBe('field1');
    expect(dep.condition).toMatchObject({ operator: 'equals', value: 'test' });
    expect(dep.effects).toHaveLength(1);
  });

  test('createCondition creates condition', () => {
    const condition = createCondition('greaterThan', 10);
    expect(condition).toEqual({ operator: 'greaterThan', value: 10 });
  });

  test('effect creators work correctly', () => {
    expect(showEffect('field1')).toMatchObject({ action: 'show', targetFieldId: 'field1' });
    expect(hideEffect('field1')).toMatchObject({ action: 'hide', targetFieldId: 'field1' });
    expect(enableEffect('field1')).toMatchObject({ action: 'enable', targetFieldId: 'field1' });
    expect(disableEffect('field1')).toMatchObject({ action: 'disable', targetFieldId: 'field1' });
    expect(requireEffect('field1')).toMatchObject({ action: 'require', targetFieldId: 'field1' });
    expect(unrequireEffect('field1')).toMatchObject({ action: 'unrequire', targetFieldId: 'field1' });
  });

  test('updateParamsEffect creates param effect', () => {
    const effect = updateParamsEffect('field1', { min: 10, max: 100 });
    expect(effect).toMatchObject({
      action: 'updateParams',
      targetFieldId: 'field1',
      params: { min: 10, max: 100 }
    });
  });
});

describe('Dependency and Function Management', () => {
  let form: any;

  beforeEach(() => {
    form = createForm('test-form');
  });

  test('addDependency adds dependency to form', () => {
    const dep = createDependency('field1', createCondition('equals', 'test'), [showEffect('field2')]);
    form = addDependency(form, dep);

    expect(form.dependencies).toHaveLength(1);
    expect(form.dependencies[0]).toEqual(dep);
  });

  test('removeDependency removes dependency by id', () => {
    const dep = createDependency('field1', createCondition('equals', 'test'), [showEffect('field2')]);
    dep.id = 'dep1';
    form = addDependency(form, dep);
    form = removeDependency(form, 'dep1');

    expect(form.dependencies).toHaveLength(0);
  });

  test('addFunction adds function to form', () => {
    form = addFunction(form, 'getData', { type: 'datasource', description: 'Get data' });

    expect(form.functions.getData).toEqual({ type: 'datasource', description: 'Get data' });
  });

  test('removeFunction removes function from form', () => {
    form = addFunction(form, 'getData', { type: 'datasource', description: 'Get data' });
    form = removeFunction(form, 'getData');

    expect(form.functions.getData).toBeUndefined();
  });
});

describe('Advanced Field Validation', () => {
  test('addField throws for field without id', () => {
    const form = createForm('test');
    const invalidField = { type: 'text', caption: 'Test' } as any;
    
    expect(() => addField(form, invalidField)).toThrow(FormCreationError);
  });

  test('addField throws for field without type', () => {
    const form = createForm('test');
    const invalidField = { id: 'test', caption: 'Test' } as any;
    
    expect(() => addField(form, invalidField)).toThrow(FormCreationError);
  });

  test('addField throws for non-hidden field without caption', () => {
    const form = createForm('test');
    const invalidField = { id: 'test', type: 'text', caption: '' } as any;
    
    expect(() => addField(form, invalidField)).toThrow(FormCreationError);
  });
});

describe('JSON Conversion Edge Cases', () => {
  test('fromJSON throws for invalid JSON', () => {
    expect(() => fromJSON('invalid json')).toThrow(FormCreationError);
  });

  test('fromJSON throws for JSON without version', () => {
    const json = JSON.stringify({ formId: 'test', fields: [] });
    expect(() => fromJSON(json)).toThrow(FormCreationError);
  });

  test('fromJSON throws for JSON without formId', () => {
    const json = JSON.stringify({ version: '1.0', fields: [] });
    expect(() => fromJSON(json)).toThrow(FormCreationError);
  });

  test('fromJSON throws for JSON without fields array', () => {
    const json = JSON.stringify({ version: '1.0', formId: 'test' });
    expect(() => fromJSON(json)).toThrow(FormCreationError);
  });

  test('fromJSON throws for JSON with non-array fields', () => {
    const json = JSON.stringify({ version: '1.0', formId: 'test', fields: 'not an array' });
    expect(() => fromJSON(json)).toThrow(FormCreationError);
  });

  test('toJSON with pretty formatting', () => {
    const form = createForm('test');
    const json = toJSON(form, true);
    
    // Pretty formatted JSON should have newlines
    expect(json).toContain('\n');
  });
});

describe('Form Merging Edge Cases', () => {
  test('mergeForms with metadata merges metadata', () => {
    let form1 = createForm('form1', { metadata: { key1: 'value1' } });
    form1 = addField(form1, createTextField('field1', 'Field 1', {}));

    let form2 = createForm('form2', { metadata: { key2: 'value2' } });
    form2 = addField(form2, createTextField('field2', 'Field 2', {}));

    const merged = mergeForms([form1, form2]);

    expect(merged.metadata).toMatchObject({ key1: 'value1', key2: 'value2' });
  });

  test('mergeForms with dependencies without IDs', () => {
    let form1 = createForm('form1');
    form1 = addField(form1, createTextField('field1', 'Field 1', {}));
    form1 = {
      ...form1,
      dependencies: [
        {
          // No ID
          sourceFieldId: 'field1',
          condition: { operator: 'equals', value: 'test' },
          effects: [],
        },
      ],
    };

    let form2 = createForm('form2');
    form2 = addField(form2, createTextField('field2', 'Field 2', {}));
    form2 = {
      ...form2,
      dependencies: [
        {
          // No ID
          sourceFieldId: 'field2',
          condition: { operator: 'equals', value: 'test2' },
          effects: [],
        },
      ],
    };

    const merged = mergeForms([form1, form2]);

    // Both dependencies should be included since they have no IDs
    expect(merged.dependencies).toHaveLength(2);
  });
});

describe('Field Creation with Options', () => {
  test('createTextField with all options', () => {
    const field = createTextField('name', 'Name', {}, {
      tooltip: 'Enter your name',
      layout: { width: { desktop: 'full' } },
      validation: { required: true, minLength: 2 },
      defaultValue: 'John',
      disabled: true,
      readonly: true,
      visible: false,
      required: true,
      placeholder: 'Type here',
      helpText: 'Help text',
      prefix: '👤',
      suffix: 'suffix',
      group: 'personal',
      tabIndex: 1,
      autocomplete: 'name',
      ariaLabel: 'Name input',
      ariaDescribedBy: 'name-help',
      dataAttributes: { testid: 'name' },
      cssClasses: ['custom-class'],
      style: { color: 'red' },
    });

    expect(field.tooltip).toBe('Enter your name');
    expect(field.disabled).toBe(true);
    expect(field.readonly).toBe(true);
    expect(field.visible).toBe(false);
    expect(field.required).toBe(true);
    expect(field.placeholder).toBe('Type here');
    expect(field.helpText).toBe('Help text');
    expect(field.prefix).toBe('👤');
    expect(field.suffix).toBe('suffix');
    expect(field.group).toBe('personal');
    expect(field.tabIndex).toBe(1);
    expect(field.autocomplete).toBe('name');
    expect(field.ariaLabel).toBe('Name input');
    expect(field.ariaDescribedBy).toBe('name-help');
    expect(field.dataAttributes).toEqual({ testid: 'name' });
    expect(field.cssClasses).toEqual(['custom-class']);
    expect(field.style).toEqual({ color: 'red' });
  });
});
