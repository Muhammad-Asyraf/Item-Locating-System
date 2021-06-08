exports.getUniqueViolationError = (unique) => {
  return `The ${unique} is already in use by another account.`;
};
