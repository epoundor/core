export interface Header<T = any> {
    mobile?: boolean;
    field: String;
    label: string;
    class?: string;
    align?: "center" | "right" | "left";
    thClass?: string;
    tdClass?: string;
    formatter?: (arg0: T) => string;
}
