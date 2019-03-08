/**
 * A scheme for converting properties from array to regular style.
 * All properties listed below will be transformed to a string separated by space.
 */
export declare const propArray: {
    'background-size': boolean;
    'background-position': boolean;
    border: boolean;
    'border-bottom': boolean;
    'border-left': boolean;
    'border-top': boolean;
    'border-right': boolean;
    'border-radius': boolean;
    'border-image': boolean;
    'border-width': boolean;
    'border-style': boolean;
    'border-color': boolean;
    'box-shadow': boolean;
    flex: boolean;
    margin: boolean;
    padding: boolean;
    outline: boolean;
    'transform-origin': boolean;
    transform: boolean;
    transition: boolean;
};
/**
 * A scheme for converting arrays to regular styles inside of objects.
 * For e.g.: "{position: [0, 0]}" => "background-position: 0 0;".
 */
export declare const propArrayInObj: {
    position: boolean;
    size: boolean;
};
/**
 * A scheme for parsing and building correct styles from passed objects.
 */
export declare const propObj: {
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    background: {
        attachment: any;
        color: any;
        image: any;
        position: any;
        repeat: any;
    };
    border: {
        width: any;
        style: any;
        color: any;
    };
    'border-top': {
        width: any;
        style: any;
        color: any;
    };
    'border-right': {
        width: any;
        style: any;
        color: any;
    };
    'border-bottom': {
        width: any;
        style: any;
        color: any;
    };
    'border-left': {
        width: any;
        style: any;
        color: any;
    };
    outline: {
        width: any;
        style: any;
        color: any;
    };
    'list-style': {
        type: any;
        position: any;
        image: any;
    };
    transition: {
        property: any;
        duration: any;
        'timing-function': any;
        timingFunction: any;
        delay: any;
    };
    animation: {
        name: any;
        duration: any;
        'timing-function': any;
        timingFunction: any;
        delay: any;
        'iteration-count': any;
        iterationCount: any;
        direction: any;
        'fill-mode': any;
        fillMode: any;
        'play-state': any;
        playState: any;
    };
    'box-shadow': {
        x: number;
        y: number;
        blur: number;
        spread: number;
        color: any;
        inset: any;
    };
    'text-shadow': {
        x: number;
        y: number;
        blur: any;
        color: any;
    };
};
/**
 * A scheme for converting non-standart properties inside object.
 * For e.g.: include 'border-radius' property inside 'border' object.
 */
export declare const customPropObj: {
    border: {
        radius: string;
        image: string;
        width: string;
        style: string;
        color: string;
    };
    background: {
        size: string;
        image: string;
    };
    font: {
        style: string;
        variant: string;
        weight: string;
        stretch: string;
        size: string;
        family: string;
        lineHeight: string;
        'line-height': string;
    };
    flex: {
        grow: string;
        basis: string;
        direction: string;
        wrap: string;
        flow: string;
        shrink: string;
    };
    align: {
        self: string;
        items: string;
        content: string;
    };
    grid: {
        'template-columns': string;
        templateColumns: string;
        'template-rows': string;
        templateRows: string;
        'template-areas': string;
        templateAreas: string;
        template: string;
        'auto-columns': string;
        autoColumns: string;
        'auto-rows': string;
        autoRows: string;
        'auto-flow': string;
        autoFlow: string;
        row: string;
        column: string;
        'row-start': string;
        rowStart: string;
        'row-end': string;
        rowEnd: string;
        'column-start': string;
        columnStart: string;
        'column-end': string;
        columnEnd: string;
        area: string;
        gap: string;
        'row-gap': string;
        rowGap: string;
        'column-gap': string;
        columnGap: string;
    };
};
//# sourceMappingURL=props.d.ts.map