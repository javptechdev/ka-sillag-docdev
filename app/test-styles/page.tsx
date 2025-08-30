'use client'

export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-700 mb-4">
          If you can see this styled content, Tailwind CSS is working!
        </p>
        <div className="space-y-2">
          <div className="bg-red-100 text-red-800 p-2 rounded">Red Box</div>
          <div className="bg-green-100 text-green-800 p-2 rounded">Green Box</div>
          <div className="bg-blue-100 text-blue-800 p-2 rounded">Blue Box</div>
        </div>
      </div>
    </div>
  )
}
