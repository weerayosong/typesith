import { useState } from "react";
import { forceUsers } from "./data/mockData";
import { filterEntities, sortEntities, paginate } from "./utils/dataProcessor";
import type { EraType, ForceSide, SortOption, ForceEntity } from "./types";

// components
import EntityCard from "./components/EntityCard";
import FilterControls from "./components/FilterControls";
import Pagination from "./components/Pagination";
import EntityModal from "./components/EntityModal";

function App() {
    // state
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sideFilter, setSideFilter] = useState<"All" | ForceSide>("All");
    const [eraFilter, setEraFilter] = useState<EraType>("All");
    const [sortBy, setSortBy] = useState<SortOption>("mCountDesc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedEntity, setSelectedEntity] = useState<ForceEntity | null>(
        null,
    );

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

                {/* === CONTROLS === (ส่ง State และ SetState เป็น Props ลงไปให้ลูก) */}
                <FilterControls
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sideFilter={sideFilter}
                    setSideFilter={setSideFilter}
                    eraFilter={eraFilter}
                    setEraFilter={setEraFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onFilterChange={() => setCurrentPage(1)} // เปลี่ยนฟิลเตอร์ให้เด้งกลับหน้า 1
                />

                {/* === DISPLAY GRID === */}
                <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm min-h-100">
                    {finalData.length === 0 ? (
                        <div className="text-center text-slate-400 py-20 border-2 border-dashed border-slate-200 rounded">
                            No records found matching your criteria.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {/* EntityCard */}
                            {finalData.map((entity) => (
                                <EntityCard
                                    key={entity.id}
                                    entity={entity}
                                    onClick={() => setSelectedEntity(entity)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* === PAGINATION === (ส่ง state) */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            {/* modal นอกสุด ทับทุกอย่างเมื่อ selectedEntity !null */}
            <EntityModal
                entity={selectedEntity}
                onClose={() => setSelectedEntity(null)}
            />
        </div>
    );
}

export default App;
