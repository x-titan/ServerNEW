import assert from "assert"
import createHttpError, {
  isHttpError,
  type HttpError,
} from "http-errors"

import isValidationError from "./validationError"

import {
  isDefined,
  isString,
} from "../types"
import {
  isPostgresError,
  mapPostgresError,
} from "./postgresError"

/**
 * Converts an error into an HTTP error.
 *
 * @param {any} error The error to convert.
 *
 * @returns {HttpError} The converted HTTP error.
 *
 * @throws {AssertionError} If the error is not defined.
 */
export default function toHttpError(error: any): HttpError {
  assert(isDefined(error), "Error is required")

  if (isHttpError(error)) return error

  let status =
    error.statusCode ||
    error.status ||
    500

  let message =
    (isString(error) && error) ||
    error.message ||
    "Internal server error"

  const details = { cause: error }

  // Zod, Yup, Joi, class-validator, Ajv
  if (isValidationError(error)) {
    status = 400
    message = "Validation failed"
  }

  // Prisma, Drizzle etc.
  if (error?.code?.startsWith?.("P")) {
    status = 400
    message = "Database error"
  }

  // PostgreSQL
  if (isPostgresError(error)) {
    const mapped = mapPostgresError(error)
    status = mapped.status
    message = mapped.message
  }

  // Axios, Fetch
  if (error?.isAxiosError) {
    status = error.response?.status || 502
    message = error.response?.data?.message || "External request failed"
  }

  // Node.js errors: EADDRINUSE, ECONNREFUSED etc.
  if (error?.code && isString(error.code) && error.code.startsWith("E")) {
    status = 500
    message = `System error: ${error.code}`
  }

  return createHttpError(status, message, details)
}
