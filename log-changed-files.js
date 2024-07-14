/* eslint-disable */
const { execSync } = require('child_process');

// Get the list of staged files
const files = execSync('git diff --cached --name-only --diff-filter=ACMRTUB').toString().trim().split('\n');

// Log the files
if (files.length > 0 && files[0] !== '') {
  console.log('Changed files:');
  files.forEach(file => console.log(file));
} else {
  console.log('No changed files.');
}
