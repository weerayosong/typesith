import { useState } from "react";
import { forceUsers } from "./data/mockData";
import { filterEntities, sortEntities, paginate } from "./utils/dataProcessor";
import type { EraType, ForceSide, SortOption } from "./types";

function App() {
    // state
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sideFilter, setSideFilter] = useState<"All" | ForceSide>("All");
    const [eraFilter, setEraFilter] = useState<EraType>("All");
    const [sortBy, setSortBy] = useState<SortOption>("mCountDesc");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // derived state (คำนวณสด)
    const filteredData = filterEntities(
        forceUsers,
        searchTerm,
        sideFilter,
        eraFilter,
    );
    const sortedData = sortEntities(filteredData, sortBy);
    const finalData = paginate(sortedData, currentPage, 12);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredData.length / 12) || 1;

    // helper fx เวลาพิมพ์ค้นหา/เปลี่ยนฟิลเตอร์ ต้องเด้งกลับหน้า 1 เสมอ
    const handleFilterChange = () => setCurrentPage(1);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* === HEADER === */}
                <header className="border-b-2 border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight">
                            Type<s className="text-slate-300"> Script </s>
                            <span className="text-red-600">Sith</span>
                        </h1>
                        <p className="text-sm text-slate-500 tracking-widest font-semibold mt-1">
                            My Ultimate <s>Galactic Records</s> TypeScript
                            Training ground.
                        </p>
                    </div>
                    <div className="text-sm font-bold text-slate-400">
                        Found: {filteredData.length} Entities
                    </div>
                </header>

                {/* === CONTROLS === */}
                <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-wrap gap-4">
                    <div className="flex-1 min-w-50">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search name or title..."
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleFilterChange();
                            }}
                        />
                    </div>

                    <div className="w-full md:w-auto">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Affiliation
                        </label>
                        <select
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                            value={sideFilter}
                            onChange={(e) => {
                                setSideFilter(
                                    e.target.value as "All" | ForceSide,
                                );
                                handleFilterChange();
                            }}
                        >
                            <option value="All">All Sides</option>
                            <option value="Jedi">Jedi Order</option>
                            <option value="Sith">Sith Order</option>
                        </select>
                    </div>

                    <div className="w-full md:w-auto">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Era
                        </label>
                        <select
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                            value={eraFilter}
                            onChange={(e) => {
                                setEraFilter(e.target.value as EraType);
                                handleFilterChange();
                            }}
                        >
                            <option value="All">All Eras</option>
                            <option value="Old Republic">Old Republic</option>
                            <option value="High Republic">High Republic</option>
                            <option value="Prequel">
                                Prequel / Clone Wars
                            </option>
                            <option value="Original">Original / Empire</option>
                            <option value="Sequel">Sequel / First Order</option>
                        </select>
                    </div>

                    <div className="w-full md:w-auto">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Sort By
                        </label>
                        <select
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value as SortOption);
                                handleFilterChange();
                            }}
                        >
                            <option value="mCountDesc">
                                M-Count (High-Low)
                            </option>
                            <option value="mCountAsc">
                                M-Count (Low-High)
                            </option>
                            <option value="nameAsc">Name (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* === DISPLAY GRID === */}
                <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm min-h-100">
                    {finalData.length === 0 ? (
                        <div className="text-center text-slate-400 py-20 border-2 border-dashed border-slate-200 rounded">
                            No records found matching your criteria.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {finalData.map((entity) => (
                                <div
                                    key={entity.id}
                                    className="border border-slate-200 p-4 rounded-md relative overflow-hidden group hover:border-slate-400 transition-colors"
                                >
                                    {/* แถบสีด้านข้างแบ่งฝั่ง */}
                                    <div
                                        className={`absolute top-0 left-0 bottom-0 w-1 ${entity.side === "Sith" ? "bg-red-600" : "bg-slate-400"}`}
                                    ></div>

                                    <div className="pl-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-slate-800 line-clamp-1">
                                                {entity.side === "Sith"
                                                    ? entity.darthTitle
                                                    : entity.name}
                                            </h3>
                                            <span
                                                className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${entity.side === "Sith" ? "bg-red-50 text-red-700 border border-red-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}
                                            >
                                                {entity.side}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {entity.era}
                                        </p>

                                        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                                            <span className="text-slate-500">
                                                M-Count
                                            </span>
                                            <span className="font-semibold text-slate-700">
                                                {entity.midichlorian.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* === PAGINATION === */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-white border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Prev
                        </button>
                        <span className="text-sm font-medium text-slate-500">
                            Page{" "}
                            <span className="text-slate-800 font-bold">
                                {currentPage}
                            </span>{" "}
                            of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-white border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
