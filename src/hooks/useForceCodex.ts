import { useState, useMemo } from "react";
import { filterEntities, sortEntities, paginate } from "../utils/dataProcessor";
import type { ForceEntity, EraType, ForceSide, SortOption } from "../types";

export function useForceCodex(initialData: ForceEntity[]) {
    // state
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sideFilter, setSideFilter] = useState<"All" | ForceSide>("All");
    const [eraFilter, setEraFilter] = useState<EraType>("All");
    const [sortBy, setSortBy] = useState<SortOption>("mCountDesc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedEntity, setSelectedEntity] = useState<ForceEntity | null>(
        null,
    );

    // ใช้ useMemo เพื่อเพิ่มperformance (จะคำนวณใหม่ก็ต่อเมื่อ state ที่เกี่ยวข้องมีการเปลี่ยนค่าเท่านั้น)
    const filteredData = useMemo(
        () => filterEntities(initialData, searchTerm, sideFilter, eraFilter),
        [initialData, searchTerm, sideFilter, eraFilter],
    );

    const sortedData = useMemo(
        () => sortEntities(filteredData, sortBy),
        [filteredData, sortBy],
    );

    const finalData = useMemo(
        () => paginate(sortedData, currentPage, 8),
        [sortedData, currentPage],
    );

    const totalPages = Math.ceil(filteredData.length / 8) || 1;

    // แพ็คของทุกอย่างใส่กล่อง (object) ส่งกลับไปให้คนที่เรียกใช้งาน
    return {
        // ส่ง state กลับไป
        searchTerm,
        sideFilter,
        eraFilter,
        sortBy,
        currentPage,
        selectedEntity,

        // ส่งฟังก์ชันอัปเดต state กลับไป
        setSearchTerm,
        setSideFilter,
        setEraFilter,
        setSortBy,
        setCurrentPage,
        setSelectedEntity,

        // ส่งข้อมูลที่คำนวณเสร็จแล้วกลับไป
        finalData,
        totalPages,
        totalFound: filteredData.length,
    };
}
