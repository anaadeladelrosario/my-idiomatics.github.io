# My Idiomatics

## Overview

My Idiomatics is a web application designed to help users explore and understand idiomatic expressions in various languages. Built with Next.js and powered by OpenAI's language models, this project provides an interactive platform for language learners and enthusiasts.

## Features

- 🌐 Multilingual Idiomatic Expression Exploration
- 🤖 AI-Powered Explanations and Translations
- 🚀 Fast and Responsive Next.js Frontend
- 🎨 Modern, Clean User Interface

## Technologies Used

- [Next.js](https://nextjs.org/) (v15.1.5)
- [React](https://reactjs.org/) (v19.0.0)
- [OpenAI API](https://openai.com/api/)
- [UnoCSS](https://unocss.dev/) for styling
- TypeScript

## Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- OpenAI API Key (for full functionality) or groqcloud API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-idiomatics.github.io.git
   cd my-idiomatics.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Building for Production

To create a production build:
```bash
npm run build
# then
npm start
```

## Additional Scripts

- `npm run lint`: Run ESLint
- `npm run unocss:dev`: Watch and compile UnoCSS
- `npm run unocss:build`: Build UnoCSS for production

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [UnoCSS](https://unocss.dev/)
