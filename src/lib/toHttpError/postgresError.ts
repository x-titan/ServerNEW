export function isPostgresError(error: any): boolean {
  return (
    !!error?.code &&
    typeof error.code === "string" &&
    /^[0-9A-Z]{5}$/.test(error.code)
  )
}

export function mapPostgresError(err: any) {
  switch (err.code) {
    case "23505": // unique_violation
      return { status: 409, message: "Unique constraint violation" }
    case "23503": // foreign_key_violation
      return { status: 409, message: "Foreign key constraint violation" }
    case "23502": // not_null_violation
      return { status: 400, message: "Not-null constraint violation" }
    case "40001": // serialization_failure
      return { status: 409, message: "Transaction serialization failure" }
    case "08001": // connection_exception
    case "08006": // connection_failure
      return { status: 503, message: "Database connection error" }
    default:
      return { status: 500, message: "Database error" }
  }
}
