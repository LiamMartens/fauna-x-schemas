import z, { ZodArray, ZodObject, ZodOptional, ZodString, ZodType } from 'zod';

export type PageSchema<T extends ZodType> = ZodObject<{
  data: ZodArray<T>;
  after: ZodOptional<ZodString>;
}>;

export function pageSchemaFactory<T extends ZodType>(
  documentSchema: T
): PageSchema<T> {
  return z.object({
    data: z.array(documentSchema),
    after: z.string().optional(),
  });
}
