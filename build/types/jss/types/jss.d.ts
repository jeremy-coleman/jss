import Jss from '../Jss';
import StyleSheet from '../StyleSheet';
import { ConditionalRule } from '../plugins/conditionalRule';
import { KeyframesRule } from '../plugins/keyframesRule';
import { StyleRule } from '../plugins/styleRule';
import { ViewportRule } from '../plugins/viewportRule';
import { SimpleRule } from '../plugins/simpleRule';
import { FontFaceRule } from '../plugins/fontFaceRule';
import { CSSStyleRule, CSSMediaRule, CSSKeyframesRule } from './cssom';
import RuleList from '../RuleList';
export { RuleList, StyleSheet };
export declare type Classes = {
    [classes: string]: string;
};
export declare type KeyframesMap = {
    [classes: string]: string;
};
export declare type ToCssOptions = {
    indent?: number;
    allowEmpty?: boolean;
    children?: boolean;
};
export declare type UpdateOptions = {
    process?: boolean;
    force?: boolean;
};
export declare type UpdateArguments = [Object] | [Object, UpdateOptions] | [string, Object] | [string, Object, UpdateOptions];
export interface BaseRule {
    type: string;
    key: string;
    isProcessed: boolean;
    options: RuleOptions;
    renderable?: Object | null | void;
    toString(options?: ToCssOptions): string;
}
export declare type Rule = StyleRule | ConditionalRule | FontFaceRule | KeyframesRule | SimpleRule | ViewportRule | BaseRule;
export declare type GenerateId = (rule: Rule, sheet?: StyleSheet) => string;
export declare type JssStyle = Object;
export declare type JssValue = string | number | Array<string | number | Array<string | number> | '!important'> | Object | null | false;
export interface Renderer {
    constructor(sheet?: StyleSheet): void;
    setProperty(cssRule: HTMLElement | CSSStyleRule, prop: string, value: JssValue): boolean;
    getPropertyValue(cssRule: HTMLElement | CSSStyleRule, prop: string): string;
    removeProperty(cssRule: HTMLElement | CSSStyleRule, prop: string): void;
    setSelector(cssRule: CSSStyleRule, selectorText: string): boolean;
    attach(): void;
    detach(): void;
    deploy(sheet: StyleSheet): void;
    insertRule(rule: Rule): false | CSSStyleSheet | CSSMediaRule | CSSKeyframesRule | CSSRule;
    deleteRule(cssRule: CSSRule): boolean;
    replaceRule(cssRule: CSSRule, rule: Rule): false | CSSStyleSheet | CSSMediaRule | CSSKeyframesRule | CSSRule;
    indexOf(cssRule: CSSRule): number;
    getRules(): CSSRuleList | void;
}
export declare type RuleFactoryOptions = {
    selector?: string;
    classes?: Classes;
    keyframes?: KeyframesMap;
    sheet?: StyleSheet;
    index?: number;
    jss?: Jss;
    generateId?: GenerateId;
    Renderer?: Renderer;
};
export interface ContainerRule extends BaseRule {
    at: string;
    rules: RuleList;
}
export declare type RuleOptions = {
    selector?: string;
    scoped?: boolean;
    sheet?: StyleSheet;
    index?: number;
    parent?: ContainerRule | StyleSheet;
    classes: Classes;
    keyframes: KeyframesMap;
    jss: Jss;
    generateId: GenerateId;
    Renderer: Renderer;
};
export declare type RuleListOptions = {
    classes: Classes;
    scoped?: boolean;
    keyframes: KeyframesMap;
    generateId: GenerateId;
    Renderer: Renderer;
    jss: Jss;
    sheet: StyleSheet;
    parent: ContainerRule | StyleSheet;
};
export declare type OnCreateRule = (name: string, decl: JssStyle, options: RuleOptions) => BaseRule | null;
export declare type OnProcessRule = (rule: Rule, sheet?: StyleSheet) => void;
export declare type OnProcessStyle = (style: JssStyle, rule: Rule, sheet?: StyleSheet) => JssStyle;
export declare type OnProcessSheet = (sheet?: StyleSheet) => void;
export declare type OnChangeValue = (value: JssValue, prop: string, rule: StyleRule) => JssValue;
export declare type OnUpdate = (data: Object, rule: Rule, sheet: StyleSheet, options: UpdateOptions) => void;
export declare type Plugin = {
    onCreateRule?: OnCreateRule;
    onProcessRule?: OnProcessRule;
    onProcessStyle?: OnProcessStyle;
    onProcessSheet?: OnProcessSheet;
    onChangeValue?: OnChangeValue;
    onUpdate?: OnUpdate;
};
export declare type InsertionPoint = string | HTMLElement;
declare type CreateGenerateId = () => GenerateId;
export declare type JssOptions = {
    createGenerateId?: CreateGenerateId;
    plugins?: Array<Plugin>;
    insertionPoint?: InsertionPoint;
    Renderer?: Renderer;
    virtual?: Boolean;
};
export declare type InternalJssOptions = {
    createGenerateId: CreateGenerateId;
    plugins: Array<Plugin>;
    insertionPoint?: InsertionPoint;
    Renderer: Renderer;
};
export declare type StyleSheetFactoryOptions = {
    media?: string;
    meta?: string;
    index?: number;
    link?: boolean;
    element?: HTMLStyleElement;
    generateId?: GenerateId;
    classNamePrefix?: string;
};
export declare type StyleSheetOptions = {
    media?: string;
    meta?: string;
    link?: boolean;
    element?: HTMLStyleElement;
    index: number;
    generateId: GenerateId;
    classNamePrefix?: string;
    Renderer: Renderer;
    insertionPoint?: InsertionPoint;
    jss: Jss;
};
export declare type InternalStyleSheetOptions = {
    media?: string;
    meta?: string;
    link?: boolean;
    element?: HTMLStyleElement;
    index: number;
    insertionPoint?: InsertionPoint;
    Renderer: Renderer;
    generateId: GenerateId;
    classNamePrefix?: string;
    jss: Jss;
    sheet: StyleSheet;
    parent: ConditionalRule | KeyframesRule | StyleSheet;
    classes: Classes;
};
//# sourceMappingURL=jss.d.ts.map