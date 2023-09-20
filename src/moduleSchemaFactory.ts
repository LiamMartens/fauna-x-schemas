import { NamedModule } from './extensions/index.js';
import {
  UnknownInstanceOfSchema,
  unknownInstanceOfSchemaFactory,
} from './unknownInstanceOfSchemaFactory.js';

export type ModuleSchema<
  Named extends boolean,
  T extends string = never
> = Named extends true
  ? UnknownInstanceOfSchema<typeof NamedModule<T>>
  : UnknownInstanceOfSchema<typeof NamedModule<string>>;

const anonymousSchema: ModuleSchema<false> =
  unknownInstanceOfSchemaFactory(NamedModule);
const namedSchemaFactory = <T extends string>(name: T): ModuleSchema<true, T> =>
  unknownInstanceOfSchemaFactory(NamedModule);

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
