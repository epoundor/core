import { AlertType } from '.';
export interface AlertProps {
    /**
     * Type of Alert
     */
    type?: AlertType;
    /**
     * Can be close
     */
    closable?: boolean;
    icon?: boolean;
    border?: boolean;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        /**
         * alert content
         */
        default: any;
        /**
         * custom close icon
         */
        "close-icon": any;
        /**
         * custom icon
         */
        icon: any;
        /**
         * title content
         */
        title: any;
    }> & {
        /**
         * alert content
         */
        default: any;
        /**
         * custom close icon
         */
        "close-icon": any;
        /**
         * custom icon
         */
        icon: any;
        /**
         * title content
         */
        title: any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<AlertProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
}, string, import('vue').PublicProps, Readonly<AlertProps> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    type: AlertType;
    closable: boolean;
    icon: boolean;
    border: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
