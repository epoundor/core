import { Header } from '../../types';
export interface TableProps {
    /**
     * The headers of the table
     * */
    headers: Header<T>[];
    /**
     * The data to display
     * */
    data: T[];
    /**
     * The loading state
     * */
    loading?: boolean;
}
declare const _default: <T = Record<string, any>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onRowHovered?: ((target: {
            idx: number;
            item: T;
        } | null) => any) | undefined;
        readonly onRowDblClick?: ((target: {
            idx: number;
            item: T;
        }) => any) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, "onRowHovered" | "onRowDblClick"> & TableProps & Partial<{}>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: Readonly<{
        empty?: string;
    } & {
        [key: string]: (_: {
            item: T;
            idx: number;
            value: any;
        }) => any | undefined;
    }> & {
        empty?: string;
    } & {
        [key: string]: (_: {
            item: T;
            idx: number;
            value: any;
        }) => any | undefined;
    };
    emit: {
        (event: "rowHovered", target: {
            idx: number;
            item: T;
        } | null): void;
        (event: "rowDblClick", target: {
            idx: number;
            item: T;
        }): void;
    };
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
