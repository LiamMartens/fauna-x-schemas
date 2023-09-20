import { NamedDocumentReference } from './NamedDocumentReference.js';

export type TypedDocument<T extends string, Data> = NamedDocumentReference<T> &
  Data;
