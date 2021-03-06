/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
import Jss from './Jss';

/**
 * Export a constant indicating if this browser has CSSTOM support.
 * https://developers.google.com/web/updates/2018/03/cssom
 */
export const hasCSSTOMSupport = typeof CSS !== 'undefined' && CSS && 'number' in CSS;
/**
 * Extracts a styles object with only rules that contain function values.
 */

export { default as getDynamicStyles } from './utils/getDynamicStyles';
/**
 * Converts JSS array value to a CSS string.
 */

export { default as toCssValue } from './utils/toCssValue';
/**
 * Create a rule instance.
 */

export { default as createRule } from './utils/createRule';
/**
 * SheetsRegistry for SSR.
 */

export { default as SheetsRegistry } from './SheetsRegistry';
/**
 * SheetsManager for react-jss and co.
 */

export { default as SheetsManager } from './SheetsManager';
/**
 * RuleList for plugins.
 */

export { default as RuleList } from './RuleList';
/**
 * Default global SheetsRegistry instance.
 */

export { default as sheets } from './sheets';
/**
 * Class name generator creator.
 */

export { default as createGenerateId } from './utils/createGenerateId';
/**
 * Creates a new instance of Jss.
 */

export const create = options => new Jss(options);
/**
 * A global Jss instance.
 */

export default create();