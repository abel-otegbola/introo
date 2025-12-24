# Contributing to introo

Thank you for your interest in contributing to introo! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment details (OS, browser, Node version, etc.)

### Suggesting Enhancements

We welcome suggestions for new features or improvements:
- Open an issue with a clear description of the enhancement
- Explain why this enhancement would be useful
- Provide examples of how it would work

### Pull Requests

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

4. **Push to your fork** and submit a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Wait for review**
   - Address any feedback from maintainers
   - Keep your branch up to date with main

### Code Style

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Run ESLint before submitting: `npm run lint`
- Write meaningful variable and function names
- Comment complex logic when necessary

### Commit Messages

- Use clear and descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 50 characters
- Add a detailed description if needed

Example:
```
Add user authentication feature

- Implement login/logout functionality
- Add JWT token handling
- Create protected routes
```

## Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/introo.git
   cd introo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing! 🎉
