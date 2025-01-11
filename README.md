## About
  The library allows you to guarantee the existence of files used by your program on the disk. It also provides more convenient storage of paths to these files in the program.
## Install
```sh
npm install files-source-manager
```
## Usage
### Creating folders and files
You need to create a configuration object and call the `init()` function, passing its created object as an argument.
It must include the `directory` string containing the path to the location where your
resource files will be located and the
`content` object, which is the contents of the folder specified in the `directory`.
Folders are defined by the names of objects, and files are defined by the values of string variables.
```ts aaa
const config: {
    directory: 'D:/projects',
    content: {
        project1: {
            dist: {},
            src: {
                abc: 'index.js'
            },
            abcde: 'package.json',
        },
        project2: {}
    }
}

init(config);
```
After that, the appropriate structure will appear on your disk.
```
D:/projects/project1/dist/
                    /src/index.js
                    /package.json
           /project2/
```
> [!WARNING]
> You cannot use `_name`, `_type`, and `_parent` as folder or file names, as this will result in a `SourceManagerError` error. However, if you add a few letters to them or, for example, a file extension, > then there will be no error.
### Directory manipulation
After calling the `init()` function, you can conveniently access the created directories:
```ts
init(config);
console.log(config.content.project1.src.abc.toString());
```
Console log:
```
> D:\projects\project1\src\index.js
```
> [!NOTE]
> The `toString()` method is used here only because `console.log()` turns everything into JSON. The idea is that `config.content.project1.src.abc` will convert itself to a string, but to avoid errors,
> it's better to use `toString()`.

If you want to access directories in a similar way in other modules of your program, then you must output the `config` declaration to a separate module.
config.ts
```ts
export default {
    directory: 'D:/projects',
    content: {
        project1: {
            dist: {},
            src: {
                abc: 'index.js'
            },
            abcde: 'package.json',
        },
        project2: {}
    }
}
```
logExample.ts
```ts
import config from "./config";

export function log() {
    console.log(config.content.project1.src.abc.toString());
}
```
index.ts
```ts
import { init } from 'files-source-manager-test'
import config from './config'
import { log } from './logExample'

init(config);
log();
```
Console log:
```
> D:\projects\project1\src\index.js
```
The file `config.ts` may also have an extension .json and .js
