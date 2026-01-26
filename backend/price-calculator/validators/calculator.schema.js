/**
 * validators/calculator.schema.js
 * --------------------------------
 * Strict validation schema for Price Calculator API
 *
 * Goals:
 * - Secure public API
 * - Enforce clear frontend ↔ backend contract
 * - Normalize defaults safely
 * - Reject unknown / garbage fields
 */

const { z } = require("zod");

const guestsSchema = z
  .object({
    adults: z.number().int().min(1, "At least 1 adult is required"),
    children: z.number().int().min(0, "Children cannot be negative")
  })
  .strict();

const calculatorSchema = z
  .object({
    budget: z
      .number()
      .positive("Budget must be a positive number")
      .optional(),

    stayId: z.string().min(1, "stayId is required"),

    safariId: z.string().min(1, "safariId is required"),

    guests: guestsSchema.default({
      adults: 1,
      children: 0
    }),

    extras: z.array(z.string()).default([])
  })
  .strict();

module.exports = {
  calculatorSchema
};
