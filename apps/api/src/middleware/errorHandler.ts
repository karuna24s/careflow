import type { Request, Response, NextFunction } from "express";

/**
 * Standardized API error response shape
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ path: (string | number)[]; message: string }>;
}

/** Duck-type check for Zod errors (works with both Zod v3 and v4) */
function isZodError(err: unknown): err is { issues?: Array<{ path: (string | number)[]; message: string }>; errors?: Array<{ path: (string | number)[]; message: string }> } {
  return (
    err != null &&
    typeof err === "object" &&
    (Array.isArray((err as { issues?: unknown }).issues) || Array.isArray((err as { errors?: unknown }).errors))
  );
}

/**
 * Global error-handling middleware.
 * Catches Zod validation errors, generic errors, and unknown errors,
 * returning consistent JSON responses.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Zod validation errors → 400 Bad Request (v3: .errors, v4: .issues)
  if (isZodError(err)) {
    const issues = err.issues ?? err.errors ?? [];
    const errors = issues.map((e) => ({
      path: e.path,
      message: e.message,
    }));
    res.status(400).json({
      success: false,
      message: "Data validation failed.",
      errors,
    } as ApiErrorResponse);
    return;
  }

  // Generic Error → 500 Internal Server Error
  if (err instanceof Error) {
    console.error("🔥 API Error:", err.message, err.stack);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    } as ApiErrorResponse);
    return;
  }

  // Unknown error type
  console.error("🔥 Unknown error:", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
  } as ApiErrorResponse);
}
