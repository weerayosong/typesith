import type { ForceEntity } from "../types";

// กำหนดว่า Component นี้ ต้องรับ Props ชื่อ entity ซึ่งมีโครงสร้างตาม ForceEntity เป๊ะๆ
interface EntityCardProps {
    entity: ForceEntity;
}

export default function EntityCard({ entity }: EntityCardProps) {
    // ถ้าพิมพ์ entity.darthTitle นอกเงื่อนไข TS error ทันที
    const isSith = entity.side === "Sith";
    const displayName = isSith ? entity.darthTitle : entity.name;

    // กำหนดสีของแถบด้านซ้ายและ Badge ตามฝั่ง
    const sideColorClass = isSith ? "bg-red-600" : "bg-slate-400";
    const badgeClass = isSith
        ? "bg-red-50 text-red-700 border border-red-200"
        : "bg-slate-100 text-slate-600 border border-slate-200";

    return (
        <div className="border border-slate-200 p-4 rounded-md relative overflow-hidden group hover:border-slate-400 transition-colors bg-white">
            {/* แถบสีด้านข้างแบ่งฝั่ง */}
            <div
                className={`absolute top-0 left-0 bottom-0 w-1 ${sideColorClass}`}
            ></div>

            <div className="pl-3">
                <div className="flex justify-between items-start">
                    <h3
                        className="font-bold text-slate-800 line-clamp-1"
                        title={displayName}
                    >
                        {displayName}
                    </h3>
                    <span
                        className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${badgeClass}`}
                    >
                        {entity.side}
                    </span>
                </div>

                <p className="text-xs text-slate-500 mt-1">{entity.era}</p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">M-Count</span>
                    <span className="font-semibold text-slate-700">
                        {entity.midichlorian.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
