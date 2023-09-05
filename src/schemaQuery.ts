import type { ZodType, TypeOf } from 'zod';
import type { Client, Query, QueryOptions } from 'fauna';

export async function schemaQuery<T extends ZodType>(
  client: Client,
  schema: T,
  query: Query,
  options?: QueryOptions
): Promise<TypeOf<T>> {
  const response = await client.query(query, options);
  return schema.parse(response.data);
}
