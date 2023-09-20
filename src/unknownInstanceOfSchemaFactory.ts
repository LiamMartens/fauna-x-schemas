import z, { ZodEffects, ZodUnknown } from 'zod';

export abstract class EmptyClassStub {
  private constructor(..._: any[]) {}
}

export type UnknownInstanceOfSchema<
  T extends abstract new (...args: any) => any
> = ZodEffects<ZodUnknown, InstanceType<T>, unknown>;

export const unknownInstanceOfSchemaFactory = <
  T extends abstract new (...args: any) => any
>(
  ClassType: T
): UnknownInstanceOfSchema<T> =>
  z.unknown().refine((arg): arg is InstanceType<T> => arg instanceof ClassType);
