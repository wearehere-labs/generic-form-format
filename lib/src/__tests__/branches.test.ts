import {
  createForm,
  addField,
  createTextField,
  createDependency,
  createCondition,
  createCompoundCondition,
  showEffect,
  createFunctionDef,
  setValueEffect,
  clearValueEffect,
  createEffect,
  FormCreationError,
} from '../index';

describe('Branch Coverage Tests', () => {
  test('createForm with metadata', () => {
    const form = createForm('test', {
      metadata: { key: 'value' },
    });
    expect(form.metadata).toEqual({ key: 'value' });
  });

  test('createCompoundCondition with and', () => {
    const condition = createCompoundCondition('and', [
      createCondition('equals', 'value1'),
      createCondition('equals', 'value2'),
    ]);
    expect(condition.operator).toBe('and');
    expect(condition.conditions).toHaveLength(2);
  });

  test('createCompoundCondition with or', () => {
    const condition = createCompoundCondition('or', [
      createCondition('equals', 'value1'),
      createCondition('equals', 'value2'),
    ]);
    expect(condition.operator).toBe('or');
    expect(condition.conditions).toHaveLength(2);
  });

  test('createCompoundCondition with not', () => {
    const condition = createCompoundCondition('not', [
      createCondition('equals', 'value1'),
    ]);
    expect(condition.operator).toBe('not');
  });

  test('createCondition with sourceFieldId', () => {
    const condition = createCondition('equals', 'value', 'field1');
    expect(condition.sourceFieldId).toBe('field1');
  });

  test('createEffect with all parameters', () => {
    const effect = createEffect('field1', 'updateParams', { min: 10 }, 'value');
    expect(effect.targetFieldId).toBe('field1');
    expect(effect.action).toBe('updateParams');
    expect(effect.params).toEqual({ min: 10 });
    expect(effect.value).toBe('value');
  });

  test('setValueEffect sets value', () => {
    const effect = setValueEffect('field1', 'test value');
    expect(effect.action).toBe('setValue');
    expect(effect.value).toBe('test value');
  });

  test('clearValueEffect clears value', () => {
    const effect = clearValueEffect('field1');
    expect(effect.action).toBe('clearValue');
  });

  test('createDependency with id', () => {
    const dep = createDependency(
      'field1',
      createCondition('equals', 'value'),
      [showEffect('field2')],
      'dep-id'
    );
    expect(dep.id).toBe('dep-id');
  });

  test('createFunctionDef with all options', () => {
    const func = createFunctionDef('datasource', {
      description: 'Test function',
      params: ['param1', 'param2'],
      returns: 'string',
    });
    expect(func.type).toBe('datasource');
    expect(func.description).toBe('Test function');
    expect(func.params).toEqual(['param1', 'param2']);
    expect(func.returns).toBe('string');
  });

  test('createFunctionDef without options', () => {
    const func = createFunctionDef('validator');
    expect(func.type).toBe('validator');
  });

  test('mergeForms with single dependency with ID', () => {
    let form1 = createForm('form1');
    form1 = addField(form1, createTextField('field1', 'Field 1', {}));
    const dep = createDependency(
      'field1',
      createCondition('equals', 'test'),
      [showEffect('field2')],
      'dep1'
    );
    form1 = {
      ...form1,
      dependencies: [dep],
    };

    let form2 = createForm('form2');
    form2 = addField(form2, createTextField('field2', 'Field 2', {}));
    // Same dependency with same ID
    form2 = {
      ...form2,
      dependencies: [dep],
    };

    const { mergeForms } = require('../form');
    const merged = mergeForms([form1, form2]);

    // Should only have one dependency since they have same ID
    expect(merged.dependencies).toHaveLength(1);
  });

  test('field with empty id is invalid', () => {
    const form = createForm('test');
    const field = { id: '', type: 'text', caption: 'Test', params: {} } as any;
    expect(() => addField(form, field)).toThrow(FormCreationError);
  });

  test('field with non-string id is invalid', () => {
    const form = createForm('test');
    const field = { id: 123, type: 'text', caption: 'Test', params: {} } as any;
    expect(() => addField(form, field)).toThrow(FormCreationError);
  });

  test('non-hidden field with empty caption throws', () => {
    const form = createForm('test');
    const field = { id: 'test', type: 'text', caption: '', params: {} } as any;
    expect(() => addField(form, field)).toThrow(FormCreationError);
  });

  test('non-hidden field with non-string caption throws', () => {
    const form = createForm('test');
    const field = { id: 'test', type: 'text', caption: 123, params: {} } as any;
    expect(() => addField(form, field)).toThrow(FormCreationError);
  });
});
