<h1 align="center">astro-scssvars</h1>

an astro integration for variable synchronization between JavaScript/TypeScript and CSS/SCSS/Sass in your web development projects. It aims to improve code consistency, reduce redundancy, and enhance developer productivity by providing a seamless way to manage and update shared variables.

Problem statement

If you set your variables in js you will always have a flickering in the browser.

<h2 align="center">Example usage</h2>

add vm support with NODE_OPTIONS='--experimental-vm-modules' our scripts should look like:
```bash
 NODE_OPTIONS='--experimental-vm-modules' astro dev
```

```ts
import { defineConfig } from 'astro/config'

//import our plugin
import scssvars from 'astro-scssvars'

import {Theme} from './src/theme';

export default defineConfig({
  integrations: [
    scssvars({
      // the file that will be created   
      outputFile: './src/theme/css-variables.scss',
      /* the path to our variables file, like
         export default {
            primary: '#6200ee',
            secundary: 'orange',
         } 
      */
      variablesFile: './src/theme.ts',
    })
  ]})
```
output example
```scss
/* this file is generated with scssvars */
/* !!do not commit this file, add it to your ignore list!! */
:root {
  --primary: #6200ee;
  --secundary: orange;
}

/* sass variables */
$primary: #6200ee;
$secundary: orange;
```
