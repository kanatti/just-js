import {curry} from 'rambda';

const replace = curry((regex: RegExp, replacement: string, str: string) => str.replace(regex, replacement));

const replaceVowels = replace(/[AEIOU]/ig, "!");

console.log(replaceVowels("Hello There"));