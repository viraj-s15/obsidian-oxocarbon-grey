export default {
  extends: ['stylelint-config-obsidianmd'],
  rules: {
    // Obsidian's own class names, such as .HyperMD-header-1, are not kebab-case.
    'selector-class-pattern': null,
  },
};
