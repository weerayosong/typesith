interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    // ฟังก์ชันสร้างตัวเลขหน้าแบบ dynamic
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        // ถ้าหน้าทั้งหมดมีไม่เกิน 7 หน้า ให้โชว์ตัวเลขทั้งหมดเลย
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // กรณีหน้าเยอะ ต้องมีจุดไข่ปลา (...)
            if (currentPage <= 3) {
                // อยู่หน้าแรกๆ (โชว์ 1, 2, 3, 4, ..., ท้ายสุด)
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                // อยู่หน้าท้ายๆ (โชว์ 1, ..., ท้าย-3, ท้าย-2, ท้าย-1, ท้ายสุด)
                pages.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                );
            } else {
                // อยู่ตรงกลาง (โชว์ 1, ..., ก่อนหน้า, ปัจจุบัน, ถัดไป, ..., ท้ายสุด)
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                );
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 pt-2 pb-1">
            {/* ปุ่ม prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-slate-300 rounded text-xs md:text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
                Prev
            </button>

            {/* ชุดปุ่มตัวเลขหน้า */}
            <div className="hidden items-center gap-1 sm:flex">
                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-1 md:px-2 text-slate-400 font-bold"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => onPageChange(page as number)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded text-xs md:text-sm font-semibold transition shadow-sm ${
                                currentPage === page
                                    ? "bg-slate-800 text-white border-transparent" // หน้าปัจจุบัน (ปุ่มทึบ)
                                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100" // หน้าอื่นๆ (ปุ่มขาว)
                            }`}
                        >
                            {page}
                        </button>
                    ),
                )}
            </div>

            {/* บอกเลขหน้าบนมือถือ (ซ่อนตัวเลขหน้าแบบปุ่มไว้ เพราะจอมือถือแคบไป) */}
            <span className="text-sm font-medium text-slate-500 sm:hidden">
                Page{" "}
                <span className="text-slate-800 font-bold">{currentPage}</span>{" "}
                of {totalPages}
            </span>

            {/* ปุ่ม next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-slate-300 rounded text-xs md:text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
                Next
            </button>
        </div>
    );
}
