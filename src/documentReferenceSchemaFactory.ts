import { NamedDocumentReference } from './extensions/index.js';
import {
  UnknownInstanceOfSchema,
  unknownInstanceOfSchemaFactory,
} from './unknownInstanceOfSchemaFactory.js';

export type DocumentReferenceSchema<
  Named extends boolean,
  T extends string = never
> = Named extends true
  ? UnknownInstanceOfSchema<typeof NamedDocumentReference<T>>
  : UnknownInstanceOfSchema<typeof NamedDocumentReference<string>>;

const anonymousSchema: DocumentReferenceSchema<false> =
  unknownInstanceOfSchemaFactory(NamedDocumentReference);
const namedSchemaFactory = <T extends string>(
  name: T
): DocumentReferenceSchema<true, T> =>
  unknownInstanceOfSchemaFactory(NamedDocumentReference);

export function documentReferenceSchemaFactory(): DocumentReferenceSchema<false>;
export function documentReferenceSchemaFactory<T extends string>(
  name: T
): DocumentReferenceSchema<true, T>;
export function documentReferenceSchemaFactory<T extends string>(
  name?: T
): DocumentReferenceSchema<false> | DocumentReferenceSchema<true, T> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
