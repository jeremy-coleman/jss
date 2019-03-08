export declare type DOMString = string;
export interface CSSRuleBase {
    type: any;
    CSSRule?: CSSRule;
    CSSStyleSheet?: CSSStyleSheet;
    cssText: DOMString;
}
export interface CSSGroupingRule extends CSSRuleBase {
    cssRules: CSSRuleList;
    insertRule(rule: DOMString, index: number): number;
    deleteRule(index: number): void;
}
export interface CSSStyleRule extends CSSRuleBase {
    type: 1;
    style: CSSStyleDeclaration;
    selectorText: DOMString;
}
export interface CSSCharsetRule extends CSSRuleBase {
    type: 2;
    charset: DOMString;
}
export interface CSSImportRule extends CSSRuleBase {
    type: 3;
    mediaList: {
        mediaText: DOMString;
        length: number;
        item?: DOMString;
        appendMedium(medium: DOMString): void;
        deleteMedium(medium: DOMString): void;
    };
}
export interface CSSMediaRule extends CSSGroupingRule {
    type: 4;
    mediaList: {
        mediaText: DOMString;
        length: number;
        item?: DOMString;
        appendMedium(medium: DOMString): void;
        deleteMedium(medium: DOMString): void;
    };
}
export interface CSSFontFaceRule extends CSSRuleBase {
    type: 5;
    style: CSSStyleDeclaration;
}
export interface CSSKeyframeRule extends CSSRuleBase {
    type: 8;
    style: CSSStyleDeclaration;
    keyText: DOMString;
}
export interface CSSKeyframesRule extends CSSRuleBase {
    type: 7;
    cssRules: CSSRuleList;
    name: DOMString;
    appendRule(rule: DOMString): void;
    deleteRule(key: DOMString): void;
    findRule(key: DOMString): CSSKeyframeRule;
}
export interface CSSNamespaceRule extends CSSRuleBase {
    type: 10;
    namespaceURI: DOMString;
    prefix: DOMString;
}
export interface CSSViewportRule extends CSSRuleBase {
    type: 15;
    style: CSSStyleDeclaration;
}
export declare type CSSSimpleRule = CSSCharsetRule | CSSImportRule | CSSNamespaceRule;
//# sourceMappingURL=cssom.d.ts.map