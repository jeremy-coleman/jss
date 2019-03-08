import { StyleRule } from './styleRule';
import { ConditionalRule } from './conditionalRule';
import { KeyframesRule } from './keyframesRule';
import { KeyframeRule } from './keyframeRule';
import { FontFaceRule } from './fontFaceRule';
import { ViewportRule } from './viewportRule';
import { SimpleRule } from './simpleRule';
export declare const plugins: (import("..").Plugin | {
    onCreateRule(name: string, style: Object, options: import("..").RuleOptions): StyleRule;
} | {
    onCreateRule(key: string, styles: Object, options: import("..").RuleOptions): ConditionalRule;
} | {
    onCreateRule(key: string, style: Object, options: import("..").RuleOptions): KeyframeRule;
} | {
    onCreateRule(key: string, style: Object, options: import("..").RuleOptions): FontFaceRule;
} | {
    onCreateRule(key: string, style: Object, options: import("..").RuleOptions): ViewportRule;
} | {
    onCreateRule(key: string, value: Object, options: import("..").RuleOptions): SimpleRule;
})[];
export { StyleRule, ConditionalRule, KeyframesRule, KeyframeRule, FontFaceRule, ViewportRule, SimpleRule };
//# sourceMappingURL=index.d.ts.map