#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// Case converter
const toPascalCase = (str) =>
  str.replace(/(^\w|\/\w)/g, (match) => match.replace('/', '').toUpperCase());
const toPlural = (str) => (str.endsWith('s') ? str : `${str}s`).toLowerCase();

// Generate variables: __VAR0__, __VAR1__, __VAR2__
const generateVariables = (name) => {
  const base = name.includes('/') ? name.split('/').at(-1) : name;
  return {
    __VAR0__: toPlural(base), // e.g. 'products'
    __VAR1__: toPascalCase(base), // e.g. 'Product'
    __VAR2__: name.toLowerCase(), // e.g. 'user/data'
  };
};

// Replace all variables in template
const replaceTemplate = (template, variables) =>
  Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(key, 'g'), value),
    template
  );

// Generate file
const generateFile = async (templatePath, outputPath, variables, force) => {
  try {
    const fileExists = await fs.pathExists(outputPath);
    if (fileExists && !force) throw new Error(`File exists: ${outputPath}`);

    const template = await fs.readFile(templatePath, 'utf8');
    const content = replaceTemplate(template, variables);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, content);
    console.log(`✅ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
};

// CLI
program
  .name('api-generator')
  .description('Generate API helper and test templates with variables')
  .argument('<name>', 'Endpoint name (e.g. "user" or "user/data")')
  .option('--api', 'Generate API file using optimized template')
  .option('--api-simple', 'Generate API file using simple template')
  .option('--test', 'Generate test file')
  .option('-f, --force', 'Force overwrite if file exists')
  .action(async (name, options) => {
    const { api, apiSimple, test, force } = options;
    const variables = generateVariables(name);
    const templatesDir = path.join(__dirname, 'templates');

    const tasks = [];

    if (api || apiSimple) {
      const templateFile = api
        ? 'api.txt' // optimized
        : 'api-simple.txt'; // legacy

      tasks.push(
        generateFile(
          path.join(templatesDir, templateFile),
          path.join(__dirname, '../src/api-helper', `${name}.js`),
          variables,
          force
        )
      );
    }

    if (test) {
      tasks.push(
        generateFile(
          path.join(templatesDir, 'test.txt'),
          path.join(__dirname, '../__test__/api', `${name}.test.js`),
          variables,
          force
        )
      );
    }

    try {
      await Promise.all(tasks);
    } catch {
      process.exit(1);
    }
  });

program.parse();
