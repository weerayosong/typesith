/* eslint-disable */
import { useState } from "react";
import { forceUsers } from "./data/mockData";
import { filterEntities, sortEntities, paginate } from "./utils/dataProcessor";
import type { EraType, ForceSide, SortOption } from "./types";

function App() {
    // state รับค่าจากผู้ใช้
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sideFilter, setSideFilter] = useState<"All" | ForceSide>("All");
    const [eraFilter, setEraFilter] = useState<EraType>("All");
    const [sortBy, setSortBy] = useState<SortOption>("mCountDesc");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // derived state โค้ดตรงนี้จะทำงานอัตโนมัติทุกครั้งที่ state เปลี่ยน
    const filteredData = filterEntities(
        forceUsers,
        searchTerm,
        sideFilter,
        eraFilter,
    );
    const sortedData = sortEntities(filteredData, sortBy);
    const finalData = paginate(sortedData, currentPage, 12);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">
                    Type<span className="text-red-600">Sith</span> : Log Tester
                </h1>

                {/* log tester btn */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <button
                        className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition"
                        onClick={() => {
                            setSideFilter(
                                sideFilter === "All" ? "Sith" : "All",
                            );
                            setCurrentPage(1); // เปลี่ยน Filter ต้องเด้งกลับหน้า 1 เสมอ
                        }}
                    >
                        สลับฝั่ง (ตอนนี้: {sideFilter})
                    </button>

                    <button
                        className="bg-slate-200 text-slate-800 px-4 py-2 rounded hover:bg-slate-300 transition"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        ไปหน้าถัดไป (ตอนนี้: หน้า {currentPage})
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
