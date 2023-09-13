import z, { ZodObject, ZodString } from 'zod';

export type TimeStubSchema = ZodObject<{
  isoString: ZodString;
}>;

export const timeStubSchema = z.object({
  isoString: z.string(),
});
