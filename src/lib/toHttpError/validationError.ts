import { isArray } from "../../utils"

export function isValidationError(error: any): boolean {
  return (
    error?.name === "ValidationError" || // Yup
    error?.name === "ZodError" || // Zod
    error?.isJoi === true || // Joi
    isArray(error) && (error[0] as any)?.constraints || // class-validator
    (error?.errors && isArray(error.errors)) // Ajv
  )
}
