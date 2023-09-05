import z from 'zod';

const anonymousSchema = z.object({ name: z.string() });
const namedSchemaFactory = <T extends string>(name: T) =>
  z.object({
    name: z.literal(name),
  });

class NamedStub<T extends string> {
  factory(name: T) {
    return namedSchemaFactory<T>(name);
  }
}

export function moduleSchemaFactory(): typeof anonymousSchema;
export function moduleSchemaFactory<T extends string>(
  name: T
): ReturnType<NamedStub<T>['factory']>;
export function moduleSchemaFactory<T extends string>(
  name?: T
): typeof anonymousSchema | ReturnType<NamedStub<T>['factory']> {
  if (!name) return anonymousSchema;
  return namedSchemaFactory<T>(name);
}
