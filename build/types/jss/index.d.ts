import Jss from './Jss';
import StyleSheet from './StyleSheet';
import { ConditionalRule, KeyframesRule, StyleRule, ViewportRule, SimpleRule, FontFaceRule } from './plugins';
import { JssOptions } from './types';
/**
 * Export types for better typing inside plugins and integrations.
 */
export { StyleSheetFactoryOptions, JssValue, JssOptions, JssStyle, Plugin, GenerateId, RuleListOptions, Rule, Renderer, RuleOptions, UpdateOptions, Classes, BaseRule, ContainerRule } from './types';
export { Jss, StyleSheet, ConditionalRule, KeyframesRule, StyleRule, ViewportRule, SimpleRule, FontFaceRule };
/**
 * Export a constant indicating if this browser has CSSTOM support.
 * https://developers.google.com/web/updates/2018/03/cssom
 */
export declare const hasCSSTOMSupport: boolean;
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
export declare const create: (options?: JssOptions) => Jss;
declare const _default: Jss;
/**
 * A global Jss instance.
 */
export default _default;
//# sourceMappingURL=index.d.ts.map