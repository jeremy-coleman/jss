import $$observable from 'symbol-observable';
import {
  createRule,
   StyleRule,
   Rule,
   RuleOptions,
   JssStyle,
   UpdateOptions,
} from 'jss';
import { Observable } from './types';

const isObservable = value => value && value[$$observable] && value === value[$$observable]()

export type Options = UpdateOptions

export default function observablePlugin(updateOptions?: Options) {
  return {
    onCreateRule(name: string, decl: JssStyle, options: RuleOptions): Rule | null {
      if (!isObservable(decl)) return null

      // Cast `decl` to `Observable`, since it passed the type guard.
      const style$ = (decl as Observable<{
        [x: string]: string | number
      }>)

      const rule = (createRule(name, {}, options) as any as StyleRule)

      // TODO
      // Call `stream.subscribe()` returns a subscription, which should be explicitly
      // unsubscribed from when we know this sheet is no longer needed.
      style$.subscribe((style: JssStyle) => {
        for (const prop in style) {
          rule.prop(prop, style[prop], updateOptions)
        }
      })

      return rule
    },

    onProcessRule(rule: Rule) {
      if (rule && rule.type !== 'style') return

      const styleRule = (rule as any as StyleRule)
      const {style} = styleRule
      for (const prop in style) {
        const value = style[prop]
        if (!isObservable(value)) continue
        delete style[prop]
        value.subscribe({
          next: nextValue => {
            styleRule.prop(prop, nextValue, updateOptions)
          }
        })
      }
    }
  };
}
