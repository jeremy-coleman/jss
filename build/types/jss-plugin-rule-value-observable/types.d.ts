export declare type NextChannel<T> = (value: T) => void;
export declare type Observer<T> = {
    next: NextChannel<T>;
};
export declare type Unsubscribe = () => void;
export declare type Subscription = {
    unsubscribe: Unsubscribe;
};
export declare type ObserverOrNext<T> = Observer<T> | NextChannel<T>;
export declare type Observable<T> = {
    subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
};
//# sourceMappingURL=types.d.ts.map