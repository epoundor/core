import { Component } from 'vue';
export interface TabProps {
    as?: Component | string;
    id: string;
    label?: string;
    disabled?: boolean;
    type?: "outlined" | "filled";
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {
            selected: boolean;
        }): any;
        icon?(_: {}): any;
    };
    refs: {
        tab: unknown;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<TabProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<TabProps> & Readonly<{}>, {
    type: "outlined" | "filled";
    as: Component | string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    tab: unknown;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
