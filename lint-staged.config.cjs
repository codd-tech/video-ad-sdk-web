module.exports = {
  '**/*.ts?(x)': ['eslint --fix', () => 'tsc -p tsconfig.json --noEmit'],
};
