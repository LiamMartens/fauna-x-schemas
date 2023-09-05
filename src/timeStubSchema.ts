import z from 'zod';

export const timeStubSchema = z.object({
  isoString: z.string(),
});
