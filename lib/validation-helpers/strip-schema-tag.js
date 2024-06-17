function stripSchemaTag(schema, tag) {
  const flattenedSchema = flattenKeys(schema.describe());
  const keysToStrip = Object.keys(flattenedSchema).filter((key) => {
    return !(flattenedSchema[key].tags && flattenedSchema[key].tags.includes(tag));
  });

  const flaggedKeys = getFlaggedKeys(schema.describe());

  const keysWithUnknownTrue = Object.keys(flaggedKeys).filter(
    (k) => flaggedKeys[k] && flaggedKeys[k].flags && flaggedKeys[k].flags.unknown === true
  );

  const strippedSchema = schema
    .fork(Object.keys(flattenedSchema), (s) => s.optional())
    .fork(keysToStrip, (s) => s.strip())
    .fork(keysWithUnknownTrue, (s) => s.unknown(false));
  return strippedSchema;
}

function flattenKeys(o) {
  const stack = [];
  stack.push(o);
  const output = {};
  while (stack.length) {
    const { keys: current, previousKey } = stack.shift();
    const keys = Object.keys(current);

    for (const key of keys) {
      const value = current[key];
      const currentKey = previousKey ? `${previousKey}.${key}` : key;

      if (value.keys) {
        stack.unshift({ previousKey: currentKey, ...value });
      } else {
        output[currentKey] = value;
      }
    }
  }

  return output;
}

function getFlaggedKeys(o) {
  const stack = [];
  stack.push(o);
  const output = {};
  while (stack.length) {
    const { keys: current, previousKey } = stack.shift();
    const keys = Object.keys(current);

    for (const key of keys) {
      const value = current[key];
      const currentKey = previousKey ? `${previousKey}.${key}` : key;

      if (value.keys) {
        stack.unshift({ previousKey: currentKey, ...value });
        if (value.flags) {
          output[currentKey] = value;
        }
      }
    }
  }

  return output;
}

export default stripSchemaTag;
