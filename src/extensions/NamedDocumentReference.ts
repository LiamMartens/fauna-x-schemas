import { DocumentReference } from 'fauna';
import { NamedModule } from './NamedModule.js';

export class NamedDocumentReference<
  T extends string
> extends DocumentReference {
  readonly coll: NamedModule<T>;
  readonly id: string;

  constructor(args: { coll: T; id: string }) {
    super(args);
    this.id = args.id;
    this.coll = new NamedModule(args.coll);
  }
}
