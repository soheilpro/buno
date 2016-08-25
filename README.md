# buno
Buno lets you run custom scripts before and after executing a command.

This is particularly useful for displaying notifications when your build starts, succeeds or fails.
These scripts can be .gitignored so that each developer in the team gets to setup his/her notifications the way he/she likes.

## Install

```
npm install buno
```

## Usage

1. Create a `.buno` directory:

  ```
  mkdir .buno
  cd .buno
  ```

2. Create your pre/post/error scripts:

  ```
  echo 'echo Building...' > pre && chmod u+x pre
  echo 'echo Build finished.' > post && chmod u+x post
  echo 'echo Build error!' > error && chmod u+x error
  ```

3. Prefix your command with buno:

  ```
  buno <command> [args]
  ```

## How it Works

1. buno executes the pre script before running the command if it finds one at `.buno/pre`.
2. buno executes the command.
3. If the command exits with a status code of zero, it executes the post script if it finds one at `.buno/post`.
4. If the command exits with a status code of non-zero, it executes the error script if it finds one at `.buno/error`.
5. Command's status code is returned as buno's status code.

Note: You can also put your scripts globally in the `~/.buno` directory.

## Sample

The following sample uses
macOS's built-in [say](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/say.1.html) command,
[AnyBar](https://github.com/tonsky/AnyBar) and
[node-notifier](https://github.com/mikaelbr/node-notifier)
to demonstrate how to use buno:

```
# .buno/pre

say 'building'
echo -n 'orange' | nc -4u -w0 localhost 1738
notify -t 'My Awesome App' -m 'Building'
```

```
# .buno/post

say 'done'
echo -n 'green' | nc -4u -w0 localhost 1738
notify -t 'My Awesome App' -m 'Build finished.'
```

```
# .buno/error

say 'you suck at coding. ha ha!'
echo -n 'red' | nc -4u -w0 localhost 1738
notify -t 'My Awesome App' -m 'Build error!'
```

```
buno webpack ./entry.js bundle.js
```

## Version History
+ **1.0**
	+ Initial release.

## Author
**Soheil Rashidi**

+ http://soheilrashidi.com
+ http://twitter.com/soheilpro
+ http://github.com/soheilpro

## Copyright and License
Copyright 2016 Soheil Rashidi

Licensed under the The MIT License (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

http://www.opensource.org/licenses/mit-license.php

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
