/**
 * Tests targeting 100% coverage for remaining uncovered lines
 */

import {
  createDatasourceFunction,
  createValidatorFunction,
  createTransformerFunction,
  createSliderField,
  createForm,
  addField,
  addFunction,
  removeFunction,
  createTextField,
  toJSON,
  addDependency,
  removeDependency,
  createDependency,
  createCondition,
  showEffect,
} from '../index';

describe('Coverage for uncovered lines', () => {
  describe('Helper functions with optional parameters', () => {
    test('createDatasourceFunction with no description', () => {
      const fn = createDatasourceFunction();
      expect(fn.type).toBe('datasource');
      expect(fn.description).toBeUndefined();
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBe('array');
    });

    test('createDatasourceFunction with description only', () => {
      const fn = createDatasourceFunction('Fetches data');
      expect(fn.type).toBe('datasource');
      expect(fn.description).toBe('Fetches data');
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBe('array');
    });

    test('createValidatorFunction with no parameters', () => {
      const fn = createValidatorFunction();
      expect(fn.type).toBe('validator');
      expect(fn.description).toBeUndefined();
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBe('boolean');
    });

    test('createValidatorFunction with description only', () => {
      const fn = createValidatorFunction('Validates input');
      expect(fn.type).toBe('validator');
      expect(fn.description).toBe('Validates input');
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBe('boolean');
    });

    test('createTransformerFunction with no parameters', () => {
      const fn = createTransformerFunction();
      expect(fn.type).toBe('transformer');
      expect(fn.description).toBeUndefined();
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBeUndefined();
    });

    test('createTransformerFunction with description only', () => {
      const fn = createTransformerFunction('Transforms value');
      expect(fn.type).toBe('transformer');
      expect(fn.description).toBe('Transforms value');
      expect(fn.params).toBeUndefined();
      expect(fn.returns).toBeUndefined();
    });

    test('createTransformerFunction with all parameters', () => {
      const fn = createTransformerFunction('Transforms value', ['input'], 'string');
      expect(fn.type).toBe('transformer');
      expect(fn.description).toBe('Transforms value');
      expect(fn.params).toEqual(['input']);
      expect(fn.returns).toBe('string');
    });
  });

  describe('Field validation edge cases', () => {
    test('createSliderField throws error when min is missing', () => {
      expect(() => {
        // @ts-ignore - intentionally passing invalid params
        createSliderField('slider', 'Slider', { max: 100 });
      }).toThrow('Slider field must have min and max values');
    });

    test('createSliderField throws error when max is missing', () => {
      expect(() => {
        // @ts-ignore - intentionally passing invalid params
        createSliderField('slider', 'Slider', { min: 0 });
      }).toThrow('Slider field must have min and max values');
    });

    test('createSliderField throws error when both min and max are missing', () => {
      expect(() => {
        // @ts-ignore - intentionally passing invalid params
        createSliderField('slider', 'Slider', {});
      }).toThrow('Slider field must have min and max values');
    });

    test('createSliderField succeeds when both min and max are provided', () => {
      const field = createSliderField('slider', 'Slider', { min: 0, max: 100 });
      expect(field.type).toBe('slider');
      expect(field.params).toHaveProperty('min', 0);
      expect(field.params).toHaveProperty('max', 100);
    });
  });

  describe('Form functions edge cases', () => {
    test('removeFunction when function exists', () => {
      let form = createForm('test');
      form = addFunction(form, 'myFunc', createDatasourceFunction('test'));
      
      form = removeFunction(form, 'myFunc');
      
      expect(form.functions).toBeDefined();
      expect(form.functions?.myFunc).toBeUndefined();
    });

    test('removeFunction when functions is empty', () => {
      let form = createForm('test');
      form = addFunction(form, 'func1', createDatasourceFunction());
      
      form = removeFunction(form, 'func1');
      
      expect(form.functions).toBeDefined();
    });

    test('removeFunction when functions is undefined', () => {
      let form = createForm('test');
      // No functions added, functions is undefined
      
      form = removeFunction(form, 'nonexistent');
      
      expect(form.functions).toBeDefined();
    });

    test('addDependency when dependencies is undefined', () => {
      let form = createForm('test');
      form = addField(form, createTextField('field1', 'Field 1', {}));
      // No dependencies added yet, dependencies is undefined
      
      const dep = createDependency('field1', createCondition('equals', 'test'), []);
      form = addDependency(form, dep);
      
      expect(form.dependencies).toHaveLength(1);
    });

    test('removeDependency when dependencies is undefined', () => {
      let form = createForm('test');
      // No dependencies, dependencies is undefined
      
      form = removeDependency(form, 'nonexistent');
      
      expect(form.dependencies).toHaveLength(0);
    });

    test('removeDependency when dependencies exist', () => {
      let form = createForm('test');
      form = addField(form, createTextField('field1', 'Field 1', {}));
      
      const dep = createDependency('field1', createCondition('equals', 'test'), [showEffect('field2')]);
      dep.id = 'dep1';
      form = addDependency(form, dep);
      
      form = removeDependency(form, 'dep1');
      
      expect(form.dependencies).toHaveLength(0);
    });

    test('toJSON with pretty=false', () => {
      const form = createForm('test');
      const json = toJSON(form, false);
      
      expect(json).not.toContain('\n');
      expect(json).toContain('"formId":"test"');
    });

    test('toJSON with pretty=true (default)', () => {
      const form = createForm('test');
      const json = toJSON(form, true);
      
      expect(json).toContain('\n');
      expect(json).toContain('  ');
    });

    test('toJSON without pretty parameter defaults to true', () => {
      const form = createForm('test');
      const json = toJSON(form);
      
      expect(json).toContain('\n');
      expect(json).toContain('  ');
    });
  });

  describe('Deep equality edge cases', () => {
    test('addField with same field twice (identical content) does not throw', () => {
      let form = createForm('test');
      const field = createTextField('name', 'Name', { minLength: 1 });
      
      form = addField(form, field);
      form = addField(form, field); // Same field again
      
      expect(form.fields).toHaveLength(1);
    });

    test('addField with nested object comparison', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 }, {
        layout: { width: { mobile: 'full', desktop: '1/2' } }
      });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        layout: { width: { mobile: 'full', desktop: '1/2' } }
      });
      
      form = addField(form, field1);
      form = addField(form, field2); // Same content, different object
      
      expect(form.fields).toHaveLength(1);
    });

    test('addField with null values in nested objects', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: null
      });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: null
      });
      
      form = addField(form, field1);
      form = addField(form, field2);
      
      expect(form.fields).toHaveLength(1);
    });

    test('addField with different null vs undefined values', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: null
      });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: undefined
      });
      
      form = addField(form, field1);
      
      // These should be considered different
      expect(() => addField(form, field2)).toThrow();
    });

    test('addField with different key counts throws error', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        tooltip: 'Extra property'
      });
      
      form = addField(form, field1);
      
      expect(() => addField(form, field2)).toThrow();
    });

    test('addField with missing keys throws error', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 }, {
        tooltip: 'Help text'
      });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: 'test'
      });
      
      form = addField(form, field1);
      
      expect(() => addField(form, field2)).toThrow();
    });

    test('addField with primitive types comparison', () => {
      let form = createForm('test');
      const field1 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: 'test'
      });
      const field2 = createTextField('name', 'Name', { minLength: 1 }, {
        defaultValue: 'different'
      });
      
      form = addField(form, field1);
      
      expect(() => addField(form, field2)).toThrow();
    });
  });
});
