import { TimeStub } from 'fauna';
import {
  UnknownInstanceOfSchema,
  unknownInstanceOfSchemaFactory,
} from './unknownInstanceOfSchemaFactory.js';

export type TimeStubSchema = UnknownInstanceOfSchema<typeof TimeStub>;

export const timeStubSchema: TimeStubSchema =
  unknownInstanceOfSchemaFactory(TimeStub);
