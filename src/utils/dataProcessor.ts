import type { ForceEntity, SortOption, EraType } from "../types";

// filter
export const filterEntities = (
    data: ForceEntity[],
    searchTerm: string,
    side: "All" | "Jedi" | "Sith",
    era: EraType,
): ForceEntity[] => {
    console.group(`[Process 1: Filter]`);
    console.log(`Input: ข้อมูลดิบทั้งหมด ${data.length} รายการ`);
    console.log(
        `Criteria: Search="${searchTerm}", Side="${side}", Era="${era}"`,
    );

    const result = data.filter((u) => {
        // เรียก u.darthTitle ได้ ก็ต่อเมื่อเช็คก่อนว่า u.side === "Sith"
        const darthName = u.side === "Sith" ? u.darthTitle.toLowerCase() : "";
        const normalName = u.name.toLowerCase();
        const term = searchTerm.toLowerCase();

        const matchName = normalName.includes(term) || darthName.includes(term);
        const matchSide = side === "All" || u.side === side;
        const matchEra = era === "All" || u.era === era;

        return matchName && matchSide && matchEra;
    });

    console.log(`Output: กรองแล้วเหลือ ${result.length} รายการ`);
    console.groupEnd();

    return result;
};

// sort
export const sortEntities = (
    data: ForceEntity[],
    sortBy: SortOption,
): ForceEntity[] => {
    console.group(`[Process 2: Sort]`);
    console.log(`Criteria: จัดเรียงด้วยเงื่อนไข "${sortBy}"`);
    // [...data] เพื่อสร้าง Array ใหม่ ไม่ให้ไปกระทบข้อมูลต้นฉบับ
    const result = [...data].sort((a, b) => {
        if (sortBy === "nameAsc") {
            const nameA = a.side === "Sith" ? a.darthTitle : a.name;
            const nameB = b.side === "Sith" ? b.darthTitle : b.name;
            return nameA.localeCompare(nameB);
        }
        if (sortBy === "mCountDesc") return b.midichlorian - a.midichlorian;
        if (sortBy === "mCountAsc") return a.midichlorian - b.midichlorian;
        return 0;
    });

    // last
    if (result.length > 0) {
        const topItemName =
            result[0].side === "Sith" ? result[0].darthTitle : result[0].name;
        console.log(`Output: ตัวแรกสุดในลิสต์ตอนนี้คือ "${topItemName}"`);
    } else {
        console.log(`Output: ไม่มีข้อมูลให้จัดเรียง`);
    }

    console.groupEnd();
    return result;
};

// pagination
export const paginate = (
    data: ForceEntity[],
    page: number,
    itemsPerPage: number,
): ForceEntity[] => {
    console.group(`[Process 3: Pagination]`);
    console.log(`Input: ข้อมูลที่รอแบ่งหน้ามี ${data.length} รายการ`);
    console.log(
        `Criteria: ขอข้อมูลหน้า ${page} (แสดงหน้าละ ${itemsPerPage} รายการ)`,
    );

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result = data.slice(startIndex, endIndex);

    console.log(
        `Output: ดึงข้อมูลตำแหน่ง (Index) ที่ ${startIndex} ถึง ${endIndex - 1} | รวมส่งออก ${result.length} รายการ`,
    );
    console.groupEnd();

    return result;
};
