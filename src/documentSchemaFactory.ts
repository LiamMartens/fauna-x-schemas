import z, { ZodObject, ZodString } from 'zod';
import { TimeStubSchema, timeStubSchema } from './timeStubSchema.js';
import { ModuleSchema, moduleSchemaFactory } from './moduleSchemaFactory.js';

type AnonymousShape = {
  id: ZodString;
  ts: TimeStubSchema;
  coll: ModuleSchema<false>;
};
type NamedShape<T extends string> = {
  id: ZodString;
  ts: TimeStubSchema;
  coll: ModuleSchema<true, T>;
};
export type DocumentSchema<
  Named extends boolean,
  T extends string = never
> = Named extends true ? ZodObject<NamedShape<T>> : ZodObject<AnonymousShape>;

const anonymousSchema: DocumentSchema<false> = z.object({
  id: z.string(),
  ts: timeStubSchema,
  coll: moduleSchemaFactory(),
});
const namedSchemaFactory = <T extends string>(name: T): DocumentSchema<true, T> =>
  z.object({
    id: z.string(),
    ts: timeStubSchema,
    coll: moduleSchemaFactory(name),
  });

export function documentSchemaFactory(): DocumentSchema<false>;
export function documentSchemaFactory<T extends string>(
  name: T
): DocumentSchema<true, T>;
export function documentSchemaFactory<T extends string>(
  name?: T
): DocumentSchema<false> | DocumentSchema<true, T> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
