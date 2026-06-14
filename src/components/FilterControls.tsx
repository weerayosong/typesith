import type { EraType, ForceSide, SortOption } from "../types";

interface FilterControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sideFilter: "All" | ForceSide;
    setSideFilter: (side: "All" | ForceSide) => void;
    eraFilter: EraType;
    setEraFilter: (era: EraType) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    onFilterChange: () => void;
}

export default function FilterControls({
    searchTerm,
    setSearchTerm,
    sideFilter,
    setSideFilter,
    eraFilter,
    setEraFilter,
    sortBy,
    setSortBy,
    onFilterChange,
}: FilterControlsProps) {
    // ฟังก์ชัน คืนค่าทุกอย่างกลับเป็นค่าเริ่มต้น
    const handleReset = () => {
        setSearchTerm("");
        setSideFilter("All");
        setEraFilter("All");
        setSortBy("mCountDesc");
        onFilterChange();
    };

    // เช็คว่าตอนนี้ผู้ใช้กำลังใช้ฟิลเตอร์หรือค้นหาอยู่หรือเปล่า (ถ้าใช้ ถึงจะโชว์ปุ่ม Reset)
    const isFiltered =
        searchTerm !== "" ||
        sideFilter !== "All" ||
        eraFilter !== "All" ||
        sortBy !== "mCountDesc";

    return (
        // เติม items-end เพื่อให้ปุ่ม Reset จัดเรียงตรงบรรทัดเดียวกับช่อง Input ด้านล่างพอดี
        <div className="bg-white p-2 rounded-md border border-slate-200 shadow-sm flex flex-wrap items-end gap-3">
            {/* 🔍 Search Input */}
            <div className="flex-1 min-w-50">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Search
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search name or title..."
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 pr-8"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            onFilterChange();
                        }}
                    />

                    {/* ปุ่มล้างคำค้นหา (จะโชว์ก็ต่อเมื่อมี searchTerm) */}
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                onFilterChange();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                            title="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Affiliation Filter */}
            <div className="w-full sm:w-auto">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Affiliation
                </label>
                <select
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    value={sideFilter}
                    onChange={(e) => {
                        setSideFilter(e.target.value as "All" | ForceSide);
                        onFilterChange();
                    }}
                >
                    <option value="All">All Sides</option>
                    <option value="Jedi">Jedi Order</option>
                    <option value="Sith">Sith Order</option>
                </select>
            </div>

            {/* Era Filter */}
            <div className="w-full sm:w-auto">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Era
                </label>
                <select
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    value={eraFilter}
                    onChange={(e) => {
                        setEraFilter(e.target.value as EraType);
                        onFilterChange();
                    }}
                >
                    <option value="All">All Eras</option>
                    <option value="Old Republic">Old Republic</option>
                    <option value="High Republic">High Republic</option>
                    <option value="Prequel">Prequel / Clone Wars</option>
                    <option value="Original">Original / Empire</option>
                    <option value="Sequel">Sequel / First Order</option>
                </select>
            </div>

            {/* Sort By */}
            <div className="w-full sm:w-auto">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Sort By
                </label>
                <select
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value as SortOption);
                        onFilterChange();
                    }}
                >
                    <option value="mCountDesc">Midichlorian (High-Low)</option>
                    <option value="mCountAsc">Midichlorian (Low-High)</option>
                    <option value="nameAsc">Name (A-Z)</option>
                </select>
            </div>

            {/* Reset Button (โชว์เมื่อมีการเปลี่ยนค่าฟิลเตอร์เท่านั้น) */}
            {isFiltered && (
                <div className="w-full sm:w-auto">
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto h-9 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-sm font-semibold text-slate-600 transition flex items-center justify-center gap-1.5"
                        title="Reset all filters"
                    >
                        <span className="text-base leading-none">↺</span> Clear
                    </button>
                </div>
            )}
        </div>
    );
}
