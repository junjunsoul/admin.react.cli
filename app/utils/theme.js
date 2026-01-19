import { theme } from 'antd'

// 亮色主题配置
export const lightTheme = {
    algorithm: theme.defaultAlgorithm,
    components: {
        "Input": {
            "colorBorder": "rgb(217,217,217)",
            "colorBgContainer": "#ffffff",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.1)"
        },
        "InputNumber": {
            "colorBorder": "rgb(217,217,217)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.1)"
        },
        "TextArea": {
            "colorBorder": "rgb(217,217,217)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.1)"
        },
        "Modal": {
            "contentBg": "#ffffff",
            "headerBg": "#ffffff",
            "titleColor": "rgba(0, 0, 0, 0.88)",
            "colorBgMask": "rgba(0, 0, 0, 0.45)"
        },
        "Select": {
            "colorBgContainer": "#ffffff",
            "colorBorder": "rgb(217,217,217)",
            "colorBgElevated": "#ffffff",
            "controlOutline": "rgba(255, 115, 0, 0.1)"
        },
        "Empty": {
            "colorTextDescription": "rgba(0, 0, 0, 0.45)"
        },
        "Popover": {
            "colorBgElevated": "#ffffff",
            "colorBorder": "rgba(5, 5, 5, 0.06)"
        },
        "Tooltip": {
            "colorBgSpotlight": "rgba(0, 0, 0, 0.85)"
        },
        "Form": {
            "labelColor": "rgba(0, 0, 0, 0.88)",
            "labelFontSize": 14
        },
        "Button": {
            "primaryShadow": "0 2px 0 rgba(255, 115, 0, 0.1)"
        },
        "Table": {
            "colorBgContainer": "#ffffff",
            "colorBorderSecondary": "#f0f0f0",
            "headerBg": "#fafafa"
        },
        "Card": {
            "colorBgContainer": "#ffffff",
            "colorBorderSecondary": "#f0f0f0"
        },
        "Menu": {
            "colorBgContainer": "#ffffff",
            "itemBg": "#ffffff",
            "itemSelectedBg": "rgba(255, 115, 0, 0.1)"
        },
        "Drawer": {
            "colorBgElevated": "#ffffff",
            "colorBgMask": "rgba(0, 0, 0, 0.45)"
        },
        "Dropdown": {
            "colorBgElevated": "#ffffff",
            "controlItemBgHover": "rgba(0, 0, 0, 0.04)"
        },
        "Message": {
            "contentBg": "#ffffff"
        },
        "Notification": {
            "colorBgElevated": "#ffffff"
        },
        "DatePicker": {
            "colorBorder": "rgb(217,217,217)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.1)"
        },
        "Tabs": {
            "itemColor": "rgba(0, 0, 0, 0.65)",
            "itemSelectedColor": "#ff7300",
            "inkBarColor": "#ff7300"
        }
    },
    token: {
        "colorBgBase": "#ffffff",
        "colorPrimary": "#ff7300",
        "colorInfo": "#ff7300",
        "colorSuccess": "#52c41a",
        "colorWarning": "#faad14",
        "colorError": "#ff4d4f",
        "colorTextBase": "rgba(0, 0, 0, 0.88)",
        "colorTextSecondary": "rgba(0, 0, 0, 0.65)",
        "colorTextTertiary": "rgba(0, 0, 0, 0.45)",
        "colorBorder": "#d9d9d9",
        "colorBorderSecondary": "#f0f0f0",
        "borderRadius": 6,
        "fontSize": 14,
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    }
}

// 暗色主题配置
export const darkTheme = {
    algorithm: theme.darkAlgorithm,
    components: {
        "Input": {
            "colorBorder": "#3b3e43",
            "colorBgContainer": "#242628",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "InputNumber": {
            "colorBorder": "#3b3e43",
            "colorBgContainer": "#242628",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "TextArea": {
            "colorBorder": "#3b3e43",
            "colorBgContainer": "#242628",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "Modal": {
            "contentBg": "#242628",
            "headerBg": "#242628",
            "titleColor": "#e8e8e8",
            "colorBgMask": "rgba(0, 0, 0, 0.65)"
        },
        "Select": {
            "colorBgContainer": "#242628",
            "colorBorder": "#3b3e43",
            "colorBgElevated": "#2d2f33",
            "controlOutline": "rgba(255, 115, 0, 0.15)"
        },
        "Empty": {
            "colorTextDescription": "#a0a0a0"
        },
        "Popover": {
            "colorBgElevated": "#2d2f33",
            "colorBorder": "#3b3e43"
        },
        "Tooltip": {
            "colorBgSpotlight": "#2d2f33"
        },
        "Form": {
            "labelColor": "#e8e8e8",
            "labelFontSize": 14
        },
        "Button": {
            "primaryShadow": "0 2px 0 rgba(255, 115, 0, 0.15)"
        },
        "Table": {
            "colorBgContainer": "#1a1c1e",
            "colorBorderSecondary": "#3b3e43",
            "headerBg": "#242628"
        },
        "Card": {
            "colorBgContainer": "#242628",
            "colorBorderSecondary": "#3b3e43"
        },
        "Menu": {
            "colorBgContainer": "#1a1c1e",
            "itemBg": "#1a1c1e",
            "itemSelectedBg": "rgba(255, 115, 0, 0.2)"
        },
        "Drawer": {
            "colorBgElevated": "#242628",
            "colorBgMask": "rgba(0, 0, 0, 0.65)"
        },
        "Dropdown": {
            "colorBgElevated": "#2d2f33",
            "controlItemBgHover": "#3b3e43"
        },
        "Message": {
            "contentBg": "#2d2f33"
        },
        "Notification": {
            "colorBgElevated": "#2d2f33"
        },
        "DatePicker": {
            "colorBorder": "#3b3e43",
            "colorBgContainer": "#242628",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "Tabs": {
            "itemColor": "rgba(255, 255, 255, 0.65)",
            "itemSelectedColor": "#ff7300",
            "inkBarColor": "#ff7300"
        },
        "Pagination": {
            "colorBgContainer": "#2d2f33"
        },
        "Switch": {
            "colorPrimary": "#ff7300",
            "colorPrimaryHover": "#ff8c33"
        }
    },
    token: {
        "colorBgBase": "#1a1c1e",
        "colorPrimary": "#ff7300",
        "colorInfo": "#ff7300",
        "colorSuccess": "#52c41a",
        "colorWarning": "#faad14",
        "colorError": "#ff4d4f",
        "colorTextBase": "#e8e8e8",
        "colorTextSecondary": "rgba(255, 255, 255, 0.65)",
        "colorTextTertiary": "rgba(255, 255, 255, 0.45)",
        "colorBorder": "#3b3e43",
        "colorBorderSecondary": "#2d2f33",
        "borderRadius": 6,
        "fontSize": 14,
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    }
}