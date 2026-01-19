import { useState, useRef } from 'react';

const COLORS = [
  'rgba(27, 154, 99, 0.64)',
  'rgba(68, 83, 199, 0.64)',
  'rgba(199, 68, 137, 0.64)',
  'rgba(199, 137, 68, 0.64)',
  'rgba(137, 68, 199, 0.64)',
];

export default function TimelineEditor() {
  const [duration, setDuration] = useState(6);
  const [segments, setSegments] = useState([
    { id: 1, name: '电脑键盘敲声', start: 0, end: 4, color: COLORS[0] },
    { id: 2, name: '海浪拍打沙滩', start: 0, end: 4, color: COLORS[1] },
  ]);
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const containerRef = useRef(null);
  const CONTAINER_WIDTH = 392;
  const SEGMENT_HEIGHT = 40;
  const SEGMENT_GAP = 4;

  const pixelsPerSecond = CONTAINER_WIDTH / 10;

  const handleDurationChange = (delta) => {
    const newDuration = Math.max(1, Math.min(duration + delta, 10));
    setDuration(newDuration);
  };

  const handleMouseDown = (e, segmentId, type) => {
    e.stopPropagation();
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    if (type === 'move') {
      setDragging({
        id: segmentId,
        startX: e.clientX,
        originalStart: segment.start,
        originalEnd: segment.end,
      });
    } else if (type === 'resize-left' || type === 'resize-right') {
      setResizing({
        id: segmentId,
        type,
        startX: e.clientX,
        originalStart: segment.start,
        originalEnd: segment.end,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - dragging.startX;
      const deltaSeconds = deltaX / pixelsPerSecond;
      const newStart = Math.max(0, Math.min(dragging.originalStart + deltaSeconds, 10 - (dragging.originalEnd - dragging.originalStart)));
      const duration = dragging.originalEnd - dragging.originalStart;
      
      setSegments(segments.map(s => 
        s.id === dragging.id 
          ? { ...s, start: newStart, end: newStart + duration }
          : s
      ));
    } else if (resizing) {
      const deltaX = e.clientX - resizing.startX;
      const deltaSeconds = deltaX / pixelsPerSecond;
      
      setSegments(segments.map(s => {
        if (s.id === resizing.id) {
          if (resizing.type === 'resize-left') {
            const newStart = Math.max(0, Math.min(resizing.originalStart + deltaSeconds, resizing.originalEnd - 0.5));
            return { ...s, start: newStart };
          } else {
            const newEnd = Math.max(resizing.originalStart + 0.5, Math.min(resizing.originalEnd + deltaSeconds, 10));
            return { ...s, end: newEnd };
          }
        }
        return s;
      }));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  const addSegment = () => {
    const newId = Math.max(...segments.map(s => s.id), 0) + 1;
    const colorIndex = segments.length % COLORS.length;
    const lastSegment = segments[segments.length - 1];
    const newTop = lastSegment ? (segments.length * (SEGMENT_HEIGHT + SEGMENT_GAP)) : 0;
    
    setSegments([...segments, {
      id: newId,
      name: `新片段 ${newId}`,
      start: 0,
      end: Math.min(6, duration),
      color: COLORS[colorIndex]
    }]);
  };

  const deleteSegment = (id) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  return (
    <div 
      className="flex min-h-[340px] w-full flex-1 flex-col space-y-4 rounded-xl bg-black/[24%] p-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 设置总时长 */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-normal leading-[1.4] text-white">设置总时长</div>
        <div className="flex h-9 items-center gap-2">
          {/* 减少按钮 */}
          <div 
            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[30px] hover:bg-white/20"
            onClick={() => handleDurationChange(-1)}
          >
            <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-base">
              <path d="M5.25 12H19.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          
          {/* 时长显示 */}
          <div className="flex h-full w-20 select-none items-center justify-center gap-1 overflow-hidden rounded-full bg-white/10 backdrop-blur-[30px]">
            <input 
              className="h-full w-[35%] min-w-[1ch] flex-shrink-0 appearance-none border-none bg-transparent p-0 text-center text-sm font-normal text-white"
              type="number" 
              min="1" 
              max="10" 
              value={duration}
              onChange={(e) => setDuration(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            />
            <span className="text-sm font-normal text-white/50">s</span>
          </div>
          
          {/* 增加按钮 */}
          <div 
            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[30px] hover:bg-white/20"
            onClick={() => handleDurationChange(1)}
          >
            <svg width="1em" height="1em" fill="none" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" className="text-base">
              <path d="M12.28 5.96875L12.2617 19.9688" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path d="M5.25 12.9688H19.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 时间轴区域 */}
      <div className="mt-4 flex w-full flex-1 flex-col overflow-auto px-[6px]">
        {/* 时间刻度 */}
        <div className="relative flex h-3 items-center" style={{ width: `${CONTAINER_WIDTH}px` }}>
          {Array.from({ length: 11 }, (_, i) => (
            <div 
              key={i}
              className="absolute select-none text-[8px] font-normal text-white/60"
              style={{ left: `${i * pixelsPerSecond - 2}px` }}
            >
              {i}
            </div>
          ))}
        </div>

        {/* 时间轴内容 */}
        <div className="relative mt-4 h-full flex-1" style={{ width: `${CONTAINER_WIDTH}px` }}>
          {/* 背景网格线 */}
          <div className="absolute inset-0">
            {Array.from({ length: 11 }, (_, i) => (
              <div 
                key={i}
                className="absolute h-full w-px bg-white/[.12]"
                style={{ left: `${i * pixelsPerSecond}px` }}
              ></div>
            ))}
            
            {/* 开始和结束标记 */}
            <div className="absolute z-[1] h-full w-[2px] rounded-sm bg-[#6B7384]" style={{ left: '0px' }}>
              <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-90 text-xs text-[#6B7384]">
                <path d="M6.25391 12V5.36603C6.25391 4.98113 6.67057 4.74056 7.00391 4.93301L12.7491 8.25L18.4942 11.567C18.8276 11.7594 18.8276 12.2406 18.4942 12.433L12.7491 15.75L7.00391 19.067C6.67057 19.2594 6.25391 19.0189 6.25391 18.634V12Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.47435"></path>
              </svg>
            </div>
            
            <div className="absolute z-[1] h-full w-[2px] cursor-grab rounded-sm bg-[#6B7384]" style={{ left: `${duration * pixelsPerSecond}px` }}>
              <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-90 text-xs text-[#6B7384]">
                <path d="M6.25391 12V5.36603C6.25391 4.98113 6.67057 4.74056 7.00391 4.93301L12.7491 8.25L18.4942 11.567C18.8276 11.7594 18.8276 12.2406 18.4942 12.433L12.7491 15.75L7.00391 19.067C6.67057 19.2594 6.25391 19.0189 6.25391 18.634V12Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.47435"></path>
              </svg>
            </div>
          </div>

          {/* 时间段 */}
          <div className="relative h-full w-full" ref={containerRef}>
            {segments.map((segment, index) => {
              const width = (segment.end - segment.start) * pixelsPerSecond;
              const left = segment.start * pixelsPerSecond;
              const top = index * (SEGMENT_HEIGHT + SEGMENT_GAP);

              return (
                <div
                  key={segment.id}
                  className="group absolute z-10 flex cursor-move items-center rounded-lg px-[10px] backdrop-blur-[2px] transition-all duration-200 hover:after:block after:pointer-events-none after:absolute after:inset-0 after:hidden after:rounded-lg after:border after:border-white/30 after:content-['']"
                  style={{
                    left: `${left}px`,
                    width: `${width}px`,
                    top: `${top}px`,
                    height: `${SEGMENT_HEIGHT}px`,
                    backgroundColor: segment.color,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, segment.id, 'move')}
                >
                  {/* 左侧调整大小手柄 */}
                  <div 
                    className="absolute left-0 top-1/2 z-10 hidden h-[26px] w-3 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/30 group-hover:flex"
                    style={{ backgroundColor: segment.color }}
                    onMouseDown={(e) => handleMouseDown(e, segment.id, 'resize-left')}
                  >
                    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-[12px] text-white">
                      <path d="M15.5 19L8 12L15.5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>

                  {/* 片段名称 */}
                  <span className="inline-block select-none truncate text-sm font-normal leading-[1.4] text-white">
                    {segment.name}
                  </span>

                  {/* 右侧调整大小手柄 */}
                  <div 
                    className="absolute right-0 top-1/2 z-10 hidden h-[26px] w-3 -translate-y-1/2 translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/30 group-hover:flex"
                    style={{ backgroundColor: segment.color }}
                    onMouseDown={(e) => handleMouseDown(e, segment.id, 'resize-right')}
                  >
                    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-[12px] text-white">
                      <path d="M8.5 5L16 12L8.5 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>

                  {/* 删除按钮 */}
                  <div 
                    className="absolute right-3 hidden cursor-pointer items-center justify-center text-white/60 hover:text-white group-hover:flex"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSegment(segment.id);
                    }}
                  >
                    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-base">
                      <path d="M4.5 6.19434L5.31103 18.2023C5.41739 19.7771 6.72583 21.0002 8.30421 21.0002H15.6958C17.2742 21.0002 18.5826 19.7771 18.689 18.2023L19.5 6.19434" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"></path>
                      <path d="M10 11V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      <path d="M14 11V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      <path d="M2 5.5H22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      <path d="M7 5.11898L8.08155 3.06733C8.42761 2.41088 9.10869 2 9.85077 2H14.1705C14.9185 2 15.6039 2.41735 15.9473 3.08184L17 5.11898" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                </div>
              );
            })}

            {/* 添加时间戳按钮 */}
            <div 
              className="absolute left-0 flex h-10 cursor-pointer items-center justify-between rounded-lg border-[0.5px] border-dashed border-white/[.48] bg-black/[.32] px-4 text-sm font-normal leading-[1.4] text-white/[.48] backdrop-blur-[2px] hover:bg-black/[.48] hover:text-white/[.72]"
              style={{ 
                top: `${segments.length * (SEGMENT_HEIGHT + SEGMENT_GAP)}px`, 
                width: `${duration * pixelsPerSecond}px` 
              }}
              onClick={addSegment}
            >
              <span className="select-none truncate">添加时间戳</span>
              <svg width="1em" height="1em" fill="none" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-base text-white">
                <path d="M12.28 5.96875L12.2617 19.9688" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M5.25 12.9688H19.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
