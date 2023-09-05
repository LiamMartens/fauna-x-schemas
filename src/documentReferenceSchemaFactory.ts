import z from 'zod';
import { moduleSchemaFactory } from './moduleSchemaFactory.js';

const anonymousSchema = z.object({
  coll: moduleSchemaFactory(),
  id: z.string(),
});
const namedSchemaFactory = <T extends string>(name: T) =>
  z.object({
    coll: moduleSchemaFactory(name),
    id: z.string(),
  });

class NamedStub<T extends string> {
  factory(name: T) {
    return namedSchemaFactory<T>(name);
  }
}

export function documentReferenceSchemaFactory(): typeof anonymousSchema;
export function documentReferenceSchemaFactory<T extends string>(
  name: T
): ReturnType<NamedStub<T>['factory']>;
export function documentReferenceSchemaFactory<T extends string>(
  name?: T
): typeof anonymousSchema | ReturnType<NamedStub<T>['factory']> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
