import { CoreType } from './core-type';
import { is } from '../../utils';
import { CoreTypeOptions } from '../interfaces/schema.types';
import { CAST_STRATEGY, checkCastStrategy } from '../../utils/cast-strategy';

/**
 * `Boolean` are plain javascript booleans
 * @example
 * ```typescript
 * const userSchema =  new Schema({
 *   isActive: Boolean,
 *   isSomething: Schema.Types.Boolean
 * })
 * ```
 */
export class BooleanType extends CoreType {
  constructor(name: string, options?: CoreTypeOptions) {
    super(name, BooleanType.sName, options);
  }
  static sName = Boolean.name;

  cast(value, strategy = CAST_STRATEGY.DEFAULT_OR_DROP) {
    const castedValue = Boolean(value);
    if (is(castedValue, Boolean) && !is(value, Object)) {
      return castedValue;
    } else {
      return checkCastStrategy(value, strategy, this);
    }
  }

  validate(value, strategy) {
    value = super.validate(value, strategy);
    const _value = this.cast(value, strategy);
    if (_value === undefined || _value === null) return value;
    this.checkValidator(value);
    return _value;
  }

  isEmpty(value: boolean): boolean {
    return value === undefined || value === null;
  }
}

export const booleanTypeFactory = (key: string, opts: CoreTypeOptions): BooleanType => new BooleanType(key, opts);
