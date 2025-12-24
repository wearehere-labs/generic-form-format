#!/usr/bin/env node

/**
 * Validates all JSON example files against the GFF schema
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schema = require('../schema/form.schema.json');
const examplesDir = path.join(__dirname, '../examples/json');

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

// Get all JSON files in examples directory
const jsonFiles = fs.readdirSync(examplesDir)
  .filter(file => file.endsWith('.json'))
  .map(file => path.join(examplesDir, file));

console.log(`\nValidating ${jsonFiles.length} JSON examples...\n`);

let hasErrors = false;

jsonFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    const valid = validate(data);
    
    if (valid) {
      console.log(`✅ ${fileName} - Valid`);
    } else {
      console.log(`❌ ${fileName} - Invalid`);
      console.log('   Errors:');
      validate.errors.forEach(err => {
        console.log(`   - ${err.instancePath} ${err.message}`);
      });
      hasErrors = true;
    }
  } catch (error) {
    console.log(`❌ ${fileName} - Parse Error`);
    console.log(`   ${error.message}`);
    hasErrors = true;
  }
});

console.log('');

if (hasErrors) {
  console.log('❌ Validation failed\n');
  process.exit(1);
} else {
  console.log('✅ All examples are valid!\n');
  process.exit(0);
}
