import { Component } from 'react';
import PropTypes from 'prop-types';
import defaultJss, { createGenerateId, SheetsRegistry } from 'jss';
import memoize from './memoize-one';
export default class JssProvider extends Component {
    constructor() {
        super(...arguments);
        this.managers = {};
        this.createContext = memoize((outerContext, props) => {
            const { registry, classNamePrefix, jss, generateId, disableStylesGeneration, media } = props;
            // Clone the outer context
            const context = Object.assign({}, outerContext);
            if (registry) {
                context.registry = registry;
                // This way we identify a new request on the server, because user will create
                // a new Registry instance for each.
                if (registry !== this.registry) {
                    // We reset managers because we have to regenerate all sheets for the new request.
                    this.managers = {};
                    this.registry = registry;
                }
            }
            context.managers = this.managers;
            if (generateId) {
                context.sheetOptions.generateId = generateId;
            }
            else if (!context.sheetOptions.generateId) {
                if (!this.generateId) {
                    this.generateId = createGenerateId();
                }
                context.sheetOptions.generateId = this.generateId;
            }
            // Merge the classname prefix
            if (classNamePrefix) {
                context.sheetOptions.classNamePrefix =
                    (context.sheetOptions.classNamePrefix || '') + classNamePrefix;
            }
            if (media !== undefined) {
                context.sheetOptions.media = media;
            }
            if (jss) {
                context.jss = jss;
            }
            if (disableStylesGeneration !== undefined) {
                context.disableStylesGeneration = disableStylesGeneration;
            }
            return context;
        });
        this.renderProvider = (outerContext) => {
            const { children } = this.props;
            // $FlowFixMe
            const context = this.createContext(outerContext, this.props);
            return value;
            {
                context;
            }
             > { children } < /JssContext.Provider>;
        };
    }
    render() {
        return { this: .renderProvider } < /JssContext.Consumer>;
    }
}
JssProvider.propTypes = {
    registry: PropTypes.instanceOf(SheetsRegistry),
    jss: PropTypes.instanceOf(defaultJss.constructor),
    generateId: PropTypes.func,
    classNamePrefix: PropTypes.string,
    disableStylesGeneration: PropTypes.bool,
    children: PropTypes.node.isRequired,
    media: PropTypes.string
};
