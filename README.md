# fauna-x-schemas
This package can be used to apply validation to Fauna's new driver since they are moving away from GraphQL, it is now impossible to use the current codegen tooling.

## Example usage
```js
import z from 'zod';
import { Client, fql } from 'fauna';
import { documentSchemaFactory } from 'fauna-x-schemas';

// it is also possible to omit the collection name in which case zod will not check the collection type itself
const userSchema = documentSchemaFactory('User').merge(z.object({
  username: z.string()
}));

const client = new Client({
  secret: '',
});

// you can use the schema for validation or just for typing
const forceTyping = await client.query<z.infer<typeof userSchema>>(fql`User.byId("id")`);
const validated = userSchema.parse(
  await client.query(fql`User.byId("id")`)
);
```
