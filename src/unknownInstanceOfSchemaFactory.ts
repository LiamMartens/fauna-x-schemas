import z, { ZodEffects, ZodUnknown } from 'zod';

export abstract class EmptyClassStub {
  private constructor(..._: any[]) {};
}

export type UnknownInstanceOfSchema<T extends typeof EmptyClassStub> =
  ZodEffects<ZodUnknown, T, unknown>;

export const unknownInstanceOfSchemaFactory = <T extends typeof EmptyClassStub>(
  ClassType: T
): UnknownInstanceOfSchema<T> =>
  z.unknown().refine((arg): arg is T => arg instanceof ClassType);
