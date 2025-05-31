interface Option extends Record<string, string> {
    label: string;
    value: string;
}
export interface DropdownProps {
    /**
     * Button label (for default trigger)
     */
    label?: string;
    type?: "default" | "floating";
    size?: "small" | "regular";
    options: Option[];
}
type __VLS_Props = DropdownProps;
type __VLS_PublicProps = {
    modelValue?: string;
    "option"?: Option;
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        option?(_: {
            role: string;
            option: Option;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    "update:option": (value: Option) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:option"?: ((value: Option) => any) | undefined;
}>, {
    size: "small" | "regular";
    type: "default" | "floating";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
