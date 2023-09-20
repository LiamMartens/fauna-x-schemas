import { Module } from 'fauna';

export class NamedModule<T extends string> extends Module {
  readonly name: T;

  constructor(name: T) {
    super(name);
    this.name = name;
  }
}
