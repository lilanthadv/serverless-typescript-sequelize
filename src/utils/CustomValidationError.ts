class CustomValidationError extends Error {
  errorField: string;
  errorMessage: string;

  constructor(errorField: string, errorMessage: string) {
    super("CustomValidationError");
    
    this.errorField = errorField;
    this.errorMessage = errorMessage;
  }
}

export default CustomValidationError;
