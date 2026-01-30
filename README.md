# ADSC Website

<div align="center">

![ADSC Logo](https://img.shields.io/badge/ADSC-WEBSITE-blue?style=for-the-badge)

[![License](https://img.shields.io/github/license/krishna-dharsandia/adsc-platform)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/krishna-dharsandia/adsc-platform)](https://github.com/krishna-dharsandia/adsc-platform/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/krishna-dharsandia/adsc-platform)](https://github.com/krishna-dharsandia/adsc-platform/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/krishna-dharsandia/adsc-platform)](https://github.com/krishna-dharsandia/adsc-platform/pulls)

**Main website for ADSC (Atmiya Developer Students Club). Built with Next.js, this platform showcases events, hackathons, team, and resources for the ADSC community.**

[Website](https://adsc.atmiya.in) • [Report Bug](https://github.com/krishna-dharsandia/adsc-platform/issues) • [Request Feature](https://github.com/krishna-dharsandia/adsc-platform/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Running Tests](#running-tests)
  - [Code Style](#code-style)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contributors](#-contributors)

## 📖 About

ADSC Platform is the official website for Atmiya Developer Students Club. It provides:
- Event listings and details
- Hackathon information and resources
- Team member profiles
- Contact and legal information
- Modern UI built with Next.js and Tailwind CSS

### Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## ✨ Features

- 🚀 **Events & Hackathons** - Discover ongoing and past events, hackathons, and problem statements
- 👥 **Team Showcase** - Meet the core team and contributors
- 📚 **Resources** - Access articles, tech stacks, and contact info
- 🌐 **Legal & Policies** - View privacy, cookies, and terms

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

```bash
# Verify installations
node --version
bun --version
git --version
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/krishna-dharsandia/adsc-platform.git
cd adsc-platform
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

4. **Run the development server**

```bash
bun run dev
```

## 📚 Usage

Visit [https://adsc-atmiya.in](https://adsc.au) to explore events, hackathons, team, and resources. For local development, use `bun run dev` and access via `http://localhost:3000`.

## 📘 API Reference

This project does not expose a public API. All data is managed within the Next.js app.

## 🔧 Development

### Project Structure

```
adsc-platform/
├── app/                # Application routes and pages
├── components/         # React components
├── constants/          # Static data
├── lib/                # Utilities
├── public/             # Static assets
├── types/              # TypeScript types
├── utils/              # Utility functions
├── package.json        # Project metadata and dependencies
└── ...
```

### Running Tests

This project does not include automated tests yet.

### Code Style

We use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting:

```bash
# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format
```

### Building

```bash
# Production build
bun run build
```

## 🚢 Deployment

### Vercel Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
# Deploy to Vercel
bun run deploy:vercel
```

### Environment Variables

> **Note:** This project does not require any environment variables for local development or deployment at this time.

| Variable      | Description                 | Default      | Required |
|---------------|-----------------------------|--------------|----------|
| `NODE_ENV`    | Environment (development)   | `development`| No       |
| `PORT`        | Server port                 | `3000`       | No       |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build process or auxiliary tool changes

## 🔒 Security

### Reporting Security Vulnerabilities

Please do not report security vulnerabilities through public GitHub issues. Instead, please report them to our security team at adsc@atmiyauni.ac.in

See [SECURITY.md](SECURITY.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all [contributors](https://github.com/krishna-dharsandia/adsc-platform/contributors)
- [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for providing excellent tools
- The open source community for inspiration and support

## 👤 Contributors

<a href="https://github.com/krishna-dharsandia/adsc-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=krishna-dharsandia/adsc-platform" />
</a>

---

<div align="center" style="margin-top: 2rem;">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/company/adsc-au)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/adsc.atmiya)
[![YouTube](https://img.shields.io/badge/YouTube-Subscribe-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/@AtmiyaDeveloperStudentClub)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/zTp84jPNQb)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaDA0a52f3EJBeidSK0B)
[![Email](https://img.shields.io/badge/Email-adsc@atmiyauni.ac.in-D14836?logo=gmail&logoColor=white)](mailto:adsc@atmiyauni.ac.in)

Made with ❤️ by [ADSC](https://adsc-atmiya.in)

</div>
