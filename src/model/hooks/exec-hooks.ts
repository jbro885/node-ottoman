import { pipe } from '../../utils/pipe';

/**
 * Allows to execute hooks in chain,
 * passing the previous result value to the next hook.
 */
export const execHooks = async (schema, hookType: 'preHooks' | 'postHooks', hookAction, document?) => {
  if (schema[hookType] && schema[hookType][hookAction]) {
    const hooks = schema[hookType][hookAction];
    const hooksFn = pipe(...hooks);
    await hooksFn(document);
  }
};
