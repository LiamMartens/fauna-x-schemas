import z, { ZodType } from 'zod';

export function pageSchemaFactory<T extends ZodType>(documentSchema: T) {
  return z.object({
    data: z.array(documentSchema),
    after: z.string().optional(),
  });
}
