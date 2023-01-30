/**
 * exported function
 * @example
 * fn(1,2)
 */
export declare function fn(arg_1: number, arg_2: number): boolean;
/**
 * awsome namespace
 */
export declare namespace awsome {
    /**
     * namespace interface A
     */
    interface InterfaceA {
        hello: string;
        world: number;
    }
    /**
     * namespcae functions
     * @param s input argument
     */
    function fn(s: InterfaceA | string): string;
    /**
     * namespcae enum example
     */
    enum EnumA {
        /**
         * enum member one
         */
        one = 0,
        two = 1
    }
}
export declare type AnyObj = Record<any, any>;
export declare type AnyObject = AnyObj;
