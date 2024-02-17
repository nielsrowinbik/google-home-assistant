import { z } from 'zod';

export const domainCardConfigSchema = z.object({
  domain: z.string(),
  icon: z.string(),
  name: z.string(),
});

export type DomainCardConfig = z.infer<typeof domainCardConfigSchema>;
