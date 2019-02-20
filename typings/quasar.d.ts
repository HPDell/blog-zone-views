declare module "quasar" {
    export interface format {
        captialize: (str: string) => string;
        humanStorageSize: (size: number) => string;
        between: (n: number, min: number, max: number) => number;
        pad: (str: string, length: number, paddingCharacter: string) => string;
    }

    export interface DialogConfigPromot {
        model?: string;
        type?: string;
    }

    export interface DialogConfigOptionsItems {
        label?: string;
        value?: string;
        color?: string;
    }

    export interface DialogConfigOptions {
        type?: string;
        model?: string;
        items?: DialogConfigOptionsItems[];
    }

    export interface DialogConfig {
        title?: string;
        message?: string;
        // 可选的
        color?: string;

        // 可选的; 我们想要一个"OK"按钮
        ok?: boolean; // 采用i18n值，或“OK”按钮标签的字符串

        // optional; 我们想要一个"Cancel"按钮
        cancel?: boolean; // 采用i18n值，或“Cancel”按钮标签的字符串

        // 可选的; 当不单击对话按钮时防止用户关闭
        preventClose?: boolean;

        noBackdropDismiss?: boolean; // 如果preventClose为“true”，则自动设置为“true”
        noEscDismiss?: boolean; //如果preventClose为“true”，则自动设置为“true”

        // 可选的; 垂直堆叠按钮而不是水平（默认）
        stackButtons?: boolean;

        // 可选的; 对话框的位置(top, bottom, left, right)
        position?: string;

        // 可选的; 显示一个输入框（使对话框类似于JS的提示对话框）
        prompt?: DialogConfigPromot;

        // 可选的; 显示单选框，复选框或切换框
        options?: DialogConfigOptions;
    }

    export interface Dialog {
        create: (configObj: DialogConfig) => Promise<void>;
    }

    export interface PlatformInterface {
        is: {
            mobile: boolean;
            cordova: boolean;
            electron: boolean;
            desktop: boolean;
            chromeExt: boolean;
            android?: boolean;
            blackberry?: boolean;
            cros?: boolean;
            ios?: boolean;
            ipad?: boolean;
            iphone?: boolean;
            ipod?: boolean;
            kindle?: boolean;
            linux?: boolean;
            mac?: boolean;
            playbook?: boolean;
            silk?: boolean;
            chrome?: boolean;
            opera?: boolean;
            safari?: boolean;
            win?: boolean;
            winphone?: boolean;
        };
        has: {
            touch: boolean;
        };
        within: {
            iframe: boolean;
        }
    }

    export var Platform: PlatformInterface;

    export var openURL: () => any;
}