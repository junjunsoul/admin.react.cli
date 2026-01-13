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
            "colorBorder": "rgb(68,68,68)",
            "colorBgContainer": "rgb(30,30,30)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "InputNumber": {
            "colorBorder": "rgb(68,68,68)",
            "colorBgContainer": "rgb(30,30,30)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "TextArea": {
            "colorBorder": "rgb(68,68,68)",
            "colorBgContainer": "rgb(30,30,30)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "Modal": {
            "contentBg": "rgb(30,30,30)",
            "headerBg": "rgb(30,30,30)",
            "titleColor": "rgb(217,217,217)",
            "colorBgMask": "rgba(0, 0, 0, 0.65)"
        },
        "Select": {
            "colorBgContainer": "rgb(44,44,44)",
            "colorBorder": "rgb(68,68,68)",
            "colorBgElevated": "rgb(30,30,30)",
            "controlOutline": "rgba(255, 115, 0, 0.15)"
        },
        "Empty": {
            "colorTextDescription": "rgb(217,217,217)"
        },
        "Popover": {
            "colorBgElevated": "rgb(44,44,44)",
            "colorBorder": "rgb(68,68,68)"
        },
        "Tooltip": {
            "colorBgSpotlight": "rgb(44,44,44)"
        },
        "Form": {
            "labelColor": "rgb(217,217,217)",
            "labelFontSize": 14
        },
        "Button": {
            "primaryShadow": "0 2px 0 rgba(255, 115, 0, 0.15)"
        },
        "Table": {
            "colorBgContainer": "rgb(30,30,30)",
            "colorBorderSecondary": "rgb(68,68,68)",
            "headerBg": "rgb(44,44,44)"
        },
        "Card": {
            "colorBgContainer": "rgb(30,30,30)",
            "colorBorderSecondary": "rgb(68,68,68)"
        },
        "Menu": {
            "colorBgContainer": "rgb(30,30,30)",
            "itemBg": "rgb(30,30,30)",
            "itemSelectedBg": "rgba(255, 115, 0, 0.2)"
        },
        "Drawer": {
            "colorBgElevated": "rgb(30,30,30)",
            "colorBgMask": "rgba(0, 0, 0, 0.65)"
        },
        "Dropdown": {
            "colorBgElevated": "rgb(44,44,44)",
            "controlItemBgHover": "rgb(68,68,68)"
        },
        "Message": {
            "contentBg": "rgb(44,44,44)"
        },
        "Notification": {
            "colorBgElevated": "rgb(44,44,44)"
        },
        "DatePicker": {
            "colorBorder": "rgb(68,68,68)",
            "colorBgContainer": "rgb(30,30,30)",
            "activeShadow": "0 0 0 2px rgba(255, 115, 0, 0.15)"
        },
        "Tabs": {
            "itemColor": "rgba(255, 255, 255, 0.65)",
            "itemSelectedColor": "#ff7300",
            "inkBarColor": "#ff7300"
        },
        "Pagination": {
            "colorBgContainer": "rgb(44,44,44)"
        },
        "Switch": {
            "colorPrimary": "#ff7300",
            "colorPrimaryHover": "#ff8c33"
        }
    },
    token: {
        "colorBgBase": "#1E1E1E",
        "colorPrimary": "#ff7300",
        "colorInfo": "#ff7300",
        "colorSuccess": "#52c41a",
        "colorWarning": "#faad14",
        "colorError": "#ff4d4f",
        "colorTextBase": "#d9d9d9",
        "colorTextSecondary": "rgba(255, 255, 255, 0.65)",
        "colorTextTertiary": "rgba(255, 255, 255, 0.45)",
        "colorBorder": "rgb(68,68,68)",
        "colorBorderSecondary": "rgb(44,44,44)",
        "borderRadius": 6,
        "fontSize": 14,
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    }
}