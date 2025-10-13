export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-lg font-medium">Good Morning, Dr. Robert!</div>
      <div className="flex gap-2">
        <button className="px-3 py-2 text-sm border rounded">Export</button>
        <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">+ Create new</button>
      </div>
    </header>
  )
}
