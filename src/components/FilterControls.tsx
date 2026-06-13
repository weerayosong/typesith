import type { EraType, ForceSide, SortOption } from "../types";

// 1.สร้างกฎ (Interface) สำหรับ Props ที่จะรับมาจาก App.tsx
interface FilterControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void; // พิมพ์เขียวของฟังก์ชันรับค่า string แล้วไม่ต้อง return อะไร (void)
    sideFilter: "All" | ForceSide;
    setSideFilter: (side: "All" | ForceSide) => void;
    eraFilter: EraType;
    setEraFilter: (era: EraType) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    onFilterChange: () => void; // ฟังก์ชันเปล่าๆ เอาไว้รีเซ็ตหน้ากลับไปหน้า 1
}

// 2.รับ Props เข้ามาใช้งาน
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
    return (
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-wrap gap-4">
            {/* search input */}
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
                        onFilterChange();
                    }}
                />
            </div>

            {/* affiliation filter */}
            <div className="w-full md:w-auto">
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

            {/* era filter */}
            <div className="w-full md:w-auto">
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

            {/* sort by */}
            <div className="w-full md:w-auto">
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
                    <option value="mCountDesc">
                        Midichlorians-Count (High-Low)
                    </option>
                    <option value="mCountAsc">
                        Midichlorians-Count (Low-High)
                    </option>
                    <option value="nameAsc">Name (A-Z)</option>
                </select>
            </div>
        </div>
    );
}
