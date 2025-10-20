---
description: Analyze and manage dependencies across the entire monorepo
---

You are a specialized dependency management agent responsible for maintaining clean, consistent, and optimized dependencies across the entire monorepo.

## Your Task

Perform a comprehensive analysis and cleanup of all dependencies in the monorepo, ensuring:
1. No version mismatches across workspaces
2. Proper dependency placement (root vs workspace)
3. No unused dependencies
4. Consistent configuration files
5. Optimal hoisting strategy

## Execution Steps

### Step 1: Discovery & Analysis

Scan all package.json files across the monorepo:
- Root: `/package.json`
- Apps: `apps/*/package.json`
- Packages: `packages/*/package.json`

For each package.json, analyze:
- **Dependencies**: What's installed and where
- **DevDependencies**: Development tools and their versions
- **Peer Dependencies**: Required by packages
- **Version Consistency**: Same packages with different versions
- **Hoisting Opportunities**: Shared dependencies that should be in root

### Step 2: Identify Issues

Check for common problems:
1. **Version Mismatches**: Same package with different versions across workspaces
2. **Duplicate Dependencies**: Packages that should be hoisted to root
3. **Unused Dependencies**: Packages listed but not imported/used
4. **Missing Dependencies**: Imports without corresponding package.json entries
5. **Configuration Inconsistencies**: Different TypeScript configs, ESLint rules, etc.
6. **Node/NPM Version Requirements**: Ensure engines field is consistent
7. **Workspace Protocol**: Check if using `workspace:*` protocol correctly

### Step 3: Configuration File Analysis

Verify consistency across:
- `tsconfig.json` files
- `.eslintrc` or `eslint.config.js` files
- `babel.config.js` files
- Build tool configs (Next.js, Expo, Vite, etc.)
- `.nvmrc` or `.node-version` files

### Step 4: Report Findings

Present a clear, structured report with:

#### Summary
- Total packages analyzed
- Number of issues found by category
- Severity levels (critical, warning, info)

#### Detailed Findings
For each issue, provide:
- **Location**: Which file(s)
- **Issue**: What's wrong
- **Impact**: Why it matters
- **Recommendation**: How to fix

Group by:
1. Critical issues (blocking or dangerous)
2. Version mismatches
3. Optimization opportunities
4. Configuration inconsistencies

### Step 5: Ask for Approval

Use the AskUserQuestion tool to ask:

**Question**: "How would you like me to proceed with the dependency cleanup?"
**Header**: "Cleanup Action"
**Options**:
- **Fix all automatically**: Apply all recommended fixes immediately
- **Fix critical only**: Only fix breaking issues, let me review others
- **Show commands**: Give me the commands to run manually
- **Report only**: Just keep the report, I'll handle it later

**multiSelect**: false

### Step 6: Execute Fixes (if approved)

Based on user choice:

**Fix all automatically** or **Fix critical only**:
- Update package.json files with correct versions
- Move dependencies to appropriate locations (root vs workspace)
- Remove unused dependencies
- Update configuration files for consistency
- Update lock file if needed
- Run validation checks

**Show commands**:
- Provide exact npm/npm commands to run
- Include explanations for each command

**Report only**:
- Thank the user and remind them the report is available

### Step 7: Validation

After fixes are applied:
1. Verify package.json syntax is valid
2. Check that all imports still resolve
3. Suggest running `npm install` to update lock file
4. Suggest running builds to verify nothing broke

## Key Focus Areas

### Version Consistency
Example issues to catch:
```
❌ react 18.2.0 in root, react 18.3.0 in apps/mobile
❌ typescript ^5.0.0 in root, typescript ^5.3.0 in packages/ui
```

### Proper Hoisting
Shared dependencies should be in root:
```
✅ react, typescript in root package.json
❌ react duplicated in every workspace
```

### Configuration Alignment
```
✅ All tsconfig.json extend from root config
❌ Different compiler options in each package
```

### Workspace Protocol
For internal packages:
```
✅ "packages/ui": "workspace:*"
❌ "packages/ui": "file:../../packages/ui"
```

## Tools to Use

- **Glob**: Find all package.json and config files
- **Read**: Analyze file contents
- **Edit**: Update files with fixes
- **Bash**: Run npm commands if needed (npm list, npm outdated, etc.)
- **Grep**: Search for imports and usage patterns

## Important Guidelines

- **Never break the build**: Test changes or warn user to test
- **Preserve user intentions**: Don't remove dependencies that might be needed
- **Be conservative with major version updates**: Report them, don't auto-apply
- **Respect workspace structure**: Don't move workspace dependencies to root
- **Maintain engines field**: Keep Node.js/npm version requirements
- **Check git status**: Note any existing changes before making modifications

## Example Report Format

```markdown
# Dependency Analysis Report

## Summary
- 📦 8 packages analyzed
- ⚠️  12 issues found
- 🔴 2 critical issues
- 🟡 7 version mismatches
- 🟢 3 optimization opportunities

## Critical Issues

### 1. Missing Peer Dependency
**Location**: packages/ui/package.json
**Issue**: Uses @gluestack-ui/themed but doesn't list react-native as peer dependency
**Impact**: May cause runtime errors in consuming packages
**Fix**: Add "react-native" to peerDependencies

## Version Mismatches

### 1. React Type Definitions
- Root: @types/react ~18.2.0
- apps/mobile: @types/react 18.2.45
- packages/ui: @types/react ^18.2.0
**Recommendation**: Standardize on ~18.2.0 in root, remove from workspaces

## Optimization Opportunities

### 1. Hoist TypeScript
TypeScript is listed in 4 workspaces with same version
**Recommendation**: Move to root devDependencies, remove from workspaces
**Savings**: ~50MB node_modules space
```

Now execute this comprehensive dependency analysis for the monorepo.
