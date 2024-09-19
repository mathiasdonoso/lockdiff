# Lockdiffs

Lockdiffs is a command-line tool for comparing two package-lock.json files. It identifies shared dependencies and displays their version differences in a tabular format.

## Warning :warning:
This project is still in WIP

## Usage

### Basic Usage

```bash
npx lockdiffs <path/to/package-lock1.json> <path/to/package-lock2.json>
```

### Example

```bash
npx lockdiffs ./package-lock1.json ./package-lock2.json
```

This will output a table showing version differences for shared dependencies between the two package-lock.json files like the following:

```bash
Dependency        | file1  | file2  | difference
------------------------------------------------
accepts           | 1.0.0  | 1.3.8  | minor
cookie            | 0.1.0  | 0.6.0  | minor
cookie-signature  | 1.0.3  | 1.0.6  | patch
debug             | 0.8.1  | 2.6.9  | major
escape-html       | 1.0.1  | 1.0.3  | patch
express           | 4.0.0  | 4.20.0 | minor
fresh             | 0.2.2  | 0.5.2  | minor
merge-descriptors | 0.0.2  | 1.0.3  | major
methods           | 0.1.0  | 1.1.2  | major
mime              | 1.2.11 | 1.6.0  | minor
negotiator        | 0.3.0  | 0.6.3  | minor
parseurl          | 1.0.1  | 1.3.3  | minor
path-to-regexp    | 0.1.2  | 0.1.10 | patch
qs                | 0.6.6  | 6.11.0 | major
range-parser      | 1.0.0  | 1.2.1  | minor
send              | 0.2.0  | 0.19.0 | minor
serve-static      | 1.0.1  | 1.16.0 | minor
type-is           | 1.0.0  | 1.6.18 | minor
utils-merge       | 1.0.0  | 1.0.1  | patch
```

## Contributing

Feel free to open issues or submit pull requests to improve the tool. Contributions are welcome!
