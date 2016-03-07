# lineup
An inline template style for dynamic config files

## Why?
Sometimes you just need some simple one line configuration templates. A few scattered across the page with no need for
logic or looping, just some quick and dirty text replacement. Enter lineup! It's nothing fancy, simply developed for those
times when you need to provide a few text replacements from a JSON source and you don't want to unpack the object or have to
write a function for a `string.replace` call to map an object to the string. 

## Installation

* **Bower**: install with `bower install lineup` and include in a script tag on your page. The library will be accesible globally via the `lineup(template, data)` function.
* **Browser**: download lineup.js from github, place in your project directory, and include in a script tag on your page. The library will be accesible globally via the `lineup(template, data)` function.
* **NPM**: install with `npm install lineup-template`. The library can be used with `var lineup = require("lineup-template");`.

## Example

```text
// Example config file
PageTitle: %username%'s blog
Github-Link: https://github.com/%username%
Tagline: Do you need a contrived example for a % symbol that will function normally in a %engine.name% template? Look no further than this 100% fullproof example!

// Data source
{
  "username": "Commander-lol",
  "engine": {
    "name": "lineup",
    "version": "1.0.0"
  }
}

// Output
PageTitle: Commander-lol's blog
Github-Link https://github.com/Commander-lol
Tagline: Tagline: Do you need a contrived example for a % symbol that will function normally in a lineup template? Look no further than this 100% fullproof example!
```

## Usage

### Basic

`lineup(template, data)`

lineup templates only have one type of markup: the data tag. Surround any alphanumeric identifier with % symbols to turn it
into a data tag. For example, `This piece of text contains one %datatag%` has a tag called `datatag`. When the template is
executed, lineup will retrieve the property called `datatag` from the provided data object and replace it inline. Using the
previous example, executing `lineup(template, {datatag: "kitten"});` would return `This piece of text contains one kitten`.

There can be no whitespace within a data tag, as this is the method by which lineup distinguishes between normal % symbols
and data tags.

### Slightly More Advanced

Data tags can identify properties in a data object at an arbitrary depth by seperating identifiers with a period. With the
template `I really like %animal.colour% %animal.name%s`, the function call `lineup(template, {animal: {colour: "purple", "name: "jaguar"}});`
would return `I really like purple jaguars`.
