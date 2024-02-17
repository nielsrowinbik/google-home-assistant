export interface EntityCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

import { z } from 'zod';

export const entityCardConfigSchema = z.object({
  entity: z.string(),
  icon: z.string().optional(),
  name: z.string().optional(),
});
