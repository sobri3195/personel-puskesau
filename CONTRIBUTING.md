# Contributing Guide

Thank you for your interest in contributing to Sistem Data Kesehatan TNI AU!

## Development Workflow

### 1. Setup Development Environment

Follow the instructions in [SETUP.md](SETUP.md) to set up your local development environment.

### 2. Code Style Guidelines

#### TypeScript

- Use TypeScript strict mode
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

#### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Avoid inline styles, use Tailwind CSS classes

#### Backend

- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling
- Add activity logging for important operations

### 3. Git Workflow

#### Branches

- `main` - Production-ready code
- `develop` - Development branch
- `feat/*` - Feature branches
- `fix/*` - Bug fix branches
- `docs/*` - Documentation updates

#### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

Examples:
```
feat(soldiers): add export to PDF functionality
fix(auth): resolve token expiration issue
docs(api): update authentication endpoint documentation
```

### 4. Pull Request Process

1. Create a new branch from `develop`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Create a pull request to `develop`
6. Wait for code review
7. Address review comments
8. Once approved, your PR will be merged

#### PR Title Format

Use the same format as commit messages:
```
feat(module): description of changes
```

#### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Changes Made
- List of specific changes

## Testing
- How to test these changes
- Test cases covered

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #issue_number
```

### 5. Testing

#### Manual Testing

Before submitting a PR:
- Test all affected features
- Check for console errors
- Test on different screen sizes (for UI changes)
- Verify API responses

#### Future: Automated Testing

When test suites are added:
```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

### 6. Code Review Guidelines

#### For Reviewers

- Be constructive and respectful
- Check for code quality and best practices
- Verify functionality
- Look for potential bugs or security issues
- Suggest improvements

#### For Contributors

- Respond to feedback promptly
- Ask questions if unclear
- Don't take criticism personally
- Learn from the review process

### 7. Adding New Features

#### Backend Feature

1. Create model (if needed) in `server/src/models/`
2. Create controller in `server/src/controllers/`
3. Create routes in `server/src/routes/`
4. Register routes in `server/src/server.ts`
5. Add activity logging
6. Update API documentation

#### Frontend Feature

1. Create types in `client/src/types/`
2. Add API calls in `client/src/services/api.ts`
3. Create components in `client/src/components/`
4. Create pages in `client/src/pages/`
5. Add routes in `client/src/App.tsx`
6. Update navigation if needed

### 8. Database Changes

When adding or modifying database schemas:

1. Update the model file
2. Update seed data if applicable
3. Document the changes
4. Consider data migration for existing data

### 9. Security Considerations

- Never commit sensitive data (passwords, API keys, etc)
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before database operations
- Implement proper authentication and authorization

### 10. Performance Guidelines

- Optimize database queries
- Use pagination for large datasets
- Implement proper indexing
- Minimize API calls
- Optimize images and assets

### 11. Accessibility

- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain good color contrast
- Test with screen readers

### 12. Documentation

Update documentation when:
- Adding new features
- Changing API endpoints
- Modifying configuration
- Updating dependencies

Files to update:
- `README.md` - Main documentation
- `API.md` - API documentation
- `SETUP.md` - Setup instructions
- Code comments for complex logic

### 13. Dependencies

When adding new dependencies:
- Justify the need
- Check for security vulnerabilities
- Consider bundle size impact
- Update package.json properly

### 14. Common Issues

#### Port Conflicts
Change ports in configuration files if 3000 or 5000 are in use

#### MongoDB Connection
Ensure MongoDB is running and connection string is correct

#### CORS Errors
Check proxy settings in vite.config.ts

### 15. Getting Help

- Check existing documentation
- Look for similar issues
- Ask questions in pull request comments
- Contact maintainers

## Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!
