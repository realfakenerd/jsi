# JSI[just,save,it] (͠≖ ͜ʖ͠≖)👌

## The most SUPER SUPREME of all Storage wrappers

<p align="center">
    <a href="https://github.com/realfakenerd/jsi" alt="LINK GitHub package.json version (subfolder of monorepo)"> <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/realfakenerd/jsi?color=lightblue&style=flat-square"> </a>
    <a href="https://github.com/realfakenerd/jsi" alt="LINK GitHub package.json version (subfolder of monorepo)"><img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/realfakenerd/jsi?color=blue&style=flat-square">
    </a>
    
</p>

It's small, easy and agnostic, runs on every framework or with vanilla Js, it automatically stringify **data** and if the data it's already a string, it doesn't stringify, just save the data as it is. JSI also have type anotations to help with intellisense and a mini tutorial on the lib.

TODOS:

- make it selects between local and session storage
- make better and smarter 'ifs' and/or 'switches
- make the logo
- make an Doc page an site
- host it on most CDNs
- make callbacks to give you awesome dev granular control over the localStorage
- make more todos and finalizes these Promises() above :)

## Instalation:

```js

npm i jsi-just-save-it // with npm

yarn add jsi-just-save-it // better on yarn

pnpm add jsi-just-save-it // even better on pnpm

<script src="https://cdn.jsdelivr.net/npm/jsi-just-save-it">
/** use it as an iife from jsdelivr */
</script>
<script src="https://unpkg.com/jsi-just-save-it@1.0.0/dist/jsi.min.js">
/** or from unpkg */
</script>

```

## Usage:

```js
import { useJSIStorage } from "jsi-just-save-it";

const data = {
  films: ["Rogue One", "Skywalker Saga", "Solo"],
  series: ["Bad Batch", "Mandalorian", "Rebels"],
  games: ["Knights of the old republic", "Fallen Order", "Old Republic"],
};

const jsi = useJSIStorage();

jsi.set("sw", data); // saves it to the localStorage

jsi.set("sw - films"); // throws an error, so be sure to put some data

jsi.set(data); // also throws an error, the name needs to be a string type

const spit = jsi.get("sw"); // gets it from the localStorage and automatically parses it

console.log(spit); // logs out the return of the 'let' above

jsi.remove("sw"); // remove the key, throw an if theres no key with the given name

jsi.clear(); // clear the localStorage
```
