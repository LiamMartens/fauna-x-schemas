import z from 'zod';
import { timeStubSchema } from './timeStubSchema.js';
import { moduleSchemaFactory } from './moduleSchemaFactory.js';

const anonymousSchema = z.object({
  id: z.string(),
  ts: timeStubSchema,
  coll: moduleSchemaFactory(),
});
const namedSchemaFactory = <T extends string>(name: T) =>
  z.object({
    id: z.string(),
    ts: timeStubSchema,
    coll: moduleSchemaFactory(name),
  });

class NamedStub<T extends string> {
  factory(name: T) {
    return namedSchemaFactory<T>(name);
  }
}

export function documentSchemaFactory(): typeof anonymousSchema;
export function documentSchemaFactory<T extends string>(
  name: T
): ReturnType<NamedStub<T>['factory']>;
export function documentSchemaFactory<T extends string>(
  name?: T
): typeof anonymousSchema | ReturnType<NamedStub<T>['factory']> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
