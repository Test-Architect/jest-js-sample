<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/fredysiswanto/">
    <img src="https://fredysiswanto.github.io/projects/assets/images/logo_white.svg" alt="Logo" width="200" height="auto">
  </a>
</p>

<h3 align="center">Testing API with Jest + Supertest</h3>

<p align="center">
   A simple and extensible template for API testing using <strong>Jest</strong> and <strong>Supertest</strong>. <br/>
  Ideal for quick setup and custom automation scripting.
</p>

---

## About the Project

This repository provides a ready-to-use template for testing RESTful APIs using:

- [Jest](https://jestjs.io/docs/)
- [Jest Extended](https://jest-extended.jestcommunity.dev/docs/matchers/)
- [Supertest](https://github.com/ladjs/supertest#readme)
- [Fake Store API](https://fakestoreapi.com/) for sample data

## Directory Structure

![Directory Structure](image.png)

## Usage

### Run all tests

```bash
pnpm run test
```

### Generate starter testing files

```bash
node scripts/cli <file-name or api-name> --test --api
```

- `--test`: Generate a sample testing file (placed under `__test__/`)
- `--api`: Generate an API helper function file (placed under `src/api-helper/`)
- `--force | -f`: Force overwrite if file exists (please be careful!)

Example:

```bash
node scripts/cli product --test --api
```

Will create:

- `__test__/product.test.js`
- `src/api-helper/product.js`

Example Test Report:

![Sample Report](sample_report.png)

## How to Write Your API Tests

Check out this [YouTube Demo Playlist](https://www.youtube.com/playlist?list=PLm2QKf1dhlBAZ2MUieV2sAV5-Vdvl-ICh)

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed:

```bash
node -v
pnpm -v
```

### Clone the Repository

```bash
git clone https://github.com/Test-Architect/jest-js-sample.git
cd jest-js-sample
```

### Install Dependencies

```bash
pnpm install
```

You're ready to start writing tests!

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the template.
