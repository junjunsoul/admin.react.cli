/**
 * SVG图标组件
 * @param {string} name - 图标名称，对应icons目录下的文件名
 * @param {string} prefix - 图标前缀，默认为'icon'
 * @param {string} color - 图标颜色
 * @param {string|number} size - 图标大小（当未指定width/height时使用）
 * @param {string|number} width - 图标宽度（优先级高于size）
 * @param {string|number} height - 图标高度（优先级高于size）
 * @param {object} props - 其他svg属性
 */
export default function SvgIcon({
    name,
    prefix = "icon",
    color = "currentColor",
    size = "1em",
    width,
    height,
    ...props
  }) {
    const symbolId = `#${prefix}-${name}`;
  
    // 如果提供了 width/height，使用它们；否则使用 size
    const finalWidth = width !== undefined ? width : size;
    const finalHeight = height !== undefined ? height : size;
  
    return (
      <svg
        aria-hidden="true"
        width={finalWidth}
        height={finalHeight}
        fill={color}
        {...props}
      >
        <use href={symbolId} />
      </svg>
    );
  }
  