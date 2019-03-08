import $$observable from 'symbol-observable';
import { createRule, } from 'jss';
const isObservable = value => value && value[$$observable] && value === value[$$observable]();
export default function observablePlugin(updateOptions) {
    return {
        onCreateRule(name, decl, options) {
            if (!isObservable(decl))
                return null;
            // Cast `decl` to `Observable`, since it passed the type guard.
            const style$ = decl;
            const rule = createRule(name, {}, options);
            // TODO
            // Call `stream.subscribe()` returns a subscription, which should be explicitly
            // unsubscribed from when we know this sheet is no longer needed.
            style$.subscribe((style) => {
                for (const prop in style) {
                    rule.prop(prop, style[prop], updateOptions);
                }
            });
            return rule;
        },
        onProcessRule(rule) {
            if (rule && rule.type !== 'style')
                return;
            const styleRule = rule;
            const { style } = styleRule;
            for (const prop in style) {
                const value = style[prop];
                if (!isObservable(value))
                    continue;
                delete style[prop];
                value.subscribe({
                    next: nextValue => {
                        styleRule.prop(prop, nextValue, updateOptions);
                    }
                });
            }
        }
    };
}
