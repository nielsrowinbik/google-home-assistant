import { z } from 'zod';

const actionSchema = z.object({});

export const actionsSchema = z
  .object({
    tap_action: actionSchema,
    hold_action: actionSchema,
    double_tap_action: actionSchema,
  })
  .partial();

export type ActionsConfig = z.infer<typeof actionSchema>;
