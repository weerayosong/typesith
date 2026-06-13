// กำหนดกฎ Props ของการเปลี่ยนหน้า
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
    // ถ้ามีหน้าเดียว หรือไม่มีข้อมูล ไม่ต้องโชว์ปุ่ม
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 pt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 bg-white border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Prev
            </button>

            <span className="text-sm font-medium text-slate-500">
                Page{" "}
                <span className="text-slate-800 font-bold">{currentPage}</span>{" "}
                of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 bg-white border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Next
            </button>
        </div>
    );
}
