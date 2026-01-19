import TimelineEditor from "../components/TimelineEditor";

const PageName = '时间轴编辑器';

export function meta() {
  return [
    { title: `${PageName} - ${window.sysTitle}` },
  ];
}

export const handle = {
  pageKey: 'timeline-editor',
  title: PageName,
  keepAlive: false,
  menu: {
    title: PageName,
    level_1: 'settings',
    path: '/timeline-editor',
  },
};

export default function TimelineEditorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-white">时间轴编辑器</h1>
        <TimelineEditor />
      </div>
    </div>
  );
}
