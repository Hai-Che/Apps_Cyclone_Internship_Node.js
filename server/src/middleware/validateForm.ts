const validateForm = async (req, res, next) => {
  try {
    console.log("Validating...");
    return next();
  } catch (error) {
    throw error;
  }
};

export { validateForm };
