import type { ForceEntity } from "../types";

// กำหนดว่า Component นี้ ต้องรับ Props ชื่อ entity ซึ่งมีโครงสร้างตาม ForceEntity เป๊ะๆ
interface EntityCardProps {
    entity: ForceEntity;
    onClick: () => void; // เพิ่ม Props รับฟังก์ชัน onClick เพื่อเตรียมเปิด Modal
}

export default function EntityCard({ entity, onClick }: EntityCardProps) {
    // ถ้าพิมพ์ entity.darthTitle นอกเงื่อนไข TS error ทันที
    const isSith = entity.side === "Sith";
    const displayName = isSith ? entity.darthTitle : entity.name;

    const sideColorClass = isSith ? "bg-red-600" : "bg-slate-400";
    const badgeClass = isSith
        ? "bg-red-50 text-red-700 border border-red-200"
        : "bg-slate-100 text-slate-600 border border-slate-200";

    return (
        <div
            onClick={onClick}
            className="border border-slate-200 p-4 rounded-md relative overflow-hidden group hover:border-slate-400 hover:shadow-md transition-all cursor-pointer bg-white"
        >
            <div
                className={`absolute top-0 left-0 bottom-0 w-1 ${sideColorClass}`}
            ></div>

            <div className="pl-3">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3
                            className="font-bold text-slate-800 line-clamp-1 leading-tight"
                            title={displayName}
                        >
                            {displayName}
                        </h3>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                            {entity.era}
                        </span>
                    </div>
                    <span
                        className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${badgeClass}`}
                    >
                        {entity.side}
                    </span>
                </div>

                {/* Body */}
                <div className="text-xs space-y-1 mt-3">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Name</span>
                        <span className="font-semibold text-slate-700">
                            {entity.name}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Form</span>
                        <span className="font-semibold text-slate-700">
                            {entity.combatStyle}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Midichlorian</span>
                        <span className="font-semibold text-slate-700">
                            {entity.midichlorian.toLocaleString()}
                        </span>
                    </div>

                    <hr className="border-dashed border-slate-200 my-2" />

                    {/* discriminated union - แสดงข้อมูลแยกตามฝั่ง */}
                    {entity.side === "Jedi" ? (
                        <>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Role</span>
                                <span className="font-semibold text-slate-500">
                                    {entity.jediRole}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Saber</span>
                                <span className="font-semibold text-slate-700">
                                    {entity.lightsaberColor}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Focus</span>
                                <span className="font-semibold text-red-600">
                                    {entity.sithRole}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Dark Side
                                </span>
                                <span className="font-semibold text-slate-700">
                                    {entity.corruptionLevel}%
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
