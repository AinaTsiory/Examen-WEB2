export default function Receipt() {
  return (
    <div className=" absolute left-[255px] top-20 w-[1200px]">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Incomes</h1>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          +
          Add Income
        </button>
      </div>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-500">
        <div>Date</div>
        <div>Source</div>
        <div>Amount</div>
        <div>Description</div>
        <div>Actions</div>
      </div>

      {/* Placeholder incomes */}
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="grid md:grid-cols-5 gap-4 items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="text-gray-700">2025-09-01</div>
            <div className="text-gray-700">Salary</div>
            <div className="text-gray-800 font-medium">$1200</div>
            <div className="text-gray-600">Monthly salary</div>
            <div className="flex gap-3">
              <button className="text-gray-500 hover:text-blue-500 transition">
                edit
              </button>
              <button className="text-gray-500 hover:text-red-500 transition">
                supr
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (si besoin) */}
      <div className="text-center py-10 text-gray-400">
        No incomes added yet
      </div>
    </div>
  );
}
