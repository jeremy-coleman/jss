import { Options, Styles, InnerProps } from './types';
/**
 * HOC creator function that wrapps the user component.
 *
 * `withStyles(styles, [options])(Component)`
 */
export default function withStyles<Theme extends {}, S extends Styles<Theme>>(styles: S, options?: Options<Theme>): <Props extends InnerProps>(InnerComponent?: any) => any;
//# sourceMappingURL=withStyles.d.ts.map