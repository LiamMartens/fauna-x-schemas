import z, { ZodLiteral, ZodObject, ZodString } from 'zod';

type AnonymousShape = { name: ZodString };
type NamedShape<T extends string> = { name: ZodLiteral<T> };
export type ModuleSchema<
  Named extends boolean,
  T extends string = never
> = Named extends true ? ZodObject<NamedShape<T>> : ZodObject<AnonymousShape>;

const anonymousSchema: ModuleSchema<false> = z.object({ name: z.string() });
const namedSchemaFactory = <T extends string>(name: T): ModuleSchema<true, T> =>
  z.object({
    name: z.literal(name),
  });

export function moduleSchemaFactory(): ModuleSchema<false>;
export function moduleSchemaFactory<T extends string>(
  name: T
): ModuleSchema<true, T>;
export function moduleSchemaFactory<T extends string>(
  name?: T
): ModuleSchema<false> | ModuleSchema<true, T> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
