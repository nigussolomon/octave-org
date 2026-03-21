# OctaveOrg

This repository is focused on the **`@octave-org/ui`** package, which contains our core UI component library. 

## Project Structure

- **`libs/ui`**: The primary UI component library. This is the main focus and deliverable of this project.
- **`apps/web`**: A Next.js application used purely as a test environment and sandbox for developing and showcasing the UI components.

## Getting Started

This repository uses [Nx](https://nx.dev) as its build system and [Bun](https://bun.sh) for package management.

### Install Dependencies

```sh
bun install
```

### Working with the UI Package

To build the UI library:

```sh
bun nx build ui
```

To create a distributable tarball of the UI package:

```sh
cd libs/ui
bun pm pack
```
*(Note: Pushes to the `main` branch can also trigger a manual UI build workflow via GitHub Actions that publishes this tarball as an artifact).*

### Running the Test Web App

To run the development server for the test sandbox app:

```sh
bun nx dev web
```

To build the test app:

```sh
bun nx build web
```
