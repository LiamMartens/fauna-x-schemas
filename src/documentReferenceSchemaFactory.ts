import z, { ZodObject, ZodString } from 'zod';
import { ModuleSchema, moduleSchemaFactory } from './moduleSchemaFactory.js';

type AnonymousShape = {
  id: ZodString;
  coll: ModuleSchema<false>;
};
type NamedShape<T extends string> = {
  id: ZodString;
  coll: ModuleSchema<true, T>;
};
export type DocumentReferenceSchema<
  Named extends boolean,
  T extends string = never
> = Named extends true ? ZodObject<NamedShape<T>> : ZodObject<AnonymousShape>;

const anonymousSchema: DocumentReferenceSchema<false> = z.object({
  coll: moduleSchemaFactory(),
  id: z.string(),
});
const namedSchemaFactory = <T extends string>(name: T): DocumentReferenceSchema<true, T> =>
  z.object({
    coll: moduleSchemaFactory(name),
    id: z.string(),
  });

export function documentReferenceSchemaFactory(): DocumentReferenceSchema<false>
export function documentReferenceSchemaFactory<T extends string>(
  name: T
): DocumentReferenceSchema<true, T>;
export function documentReferenceSchemaFactory<T extends string>(
  name?: T
): DocumentReferenceSchema<false> | DocumentReferenceSchema<true, T> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
