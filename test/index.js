import eslint from 'eslint';
import test from 'ava';
import config from '../';

const isObject = obj => !!obj && typeof obj === 'object';

const CLIEngine = eslint.CLIEngine;
const cli = new CLIEngine({
	useEslintrc: false,
	configFile: 'eslintrc.json'
});

test('test basic properties of config', t => {
	t.truthy(isObject(config.env));
	t.truthy(isObject(config.globals));
	t.truthy(isObject(config.rules));
});

test('validate all rule syntax is correct', t => {
  const code = `const foo = 1
  ; const bar = function() {};
  bar(foo);
`;
  const result = cli.executeOnText(code);
	t.is(cli.executeOnText(code).errorCount, 0);
});

test('fails when linting rules are not followed', t => {
  const code = `import React from 'react';
  import something from 'a-module';

  function SomeComponent() {
    return (<h1
      aProp={true}
                 >SomeComponent</h1>);
    }

    SomeComponent.displayName = 'SomeComponent';

    export default SomeComponent;
`;
    const result = cli.executeOnText(code);
  t.is(result.errorCount, 4);
});
