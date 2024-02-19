import { z } from 'zod';

export const domainCardConfigSchema = z.object({
  domain: z.string(),
  primary: z.string(),
  secondary: z.string(),
  icon: z.string(),
});

export type DomainCardConfig = z.infer<typeof domainCardConfigSchema>;
