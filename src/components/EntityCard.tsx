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

    // fallback img
    const defaultJediImage =
        "https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=400&auto=format&fit=crop";
    const defaultSithImage =
        "https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=80&w=400&auto=format&fit=crop";

    const imageToDisplay = entity.imageUrl
        ? entity.imageUrl
        : isSith
          ? defaultSithImage
          : defaultJediImage;

    return (
        <div
            onClick={onClick}
            className="border border-slate-700 rounded-md relative overflow-hidden group hover:border-slate-400 hover:shadow-lg hover:shadow-slate-900/20 transition-all cursor-pointer flex flex-col h-full min-h-70"
        >
            {/* bg */}
            <img
                src={imageToDisplay}
                alt={displayName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/5 transition-colors duration-300"></div>

            {/* left color bar */}
            <div
                className={`absolute top-0 left-0 bottom-0 w-1 z-10 ${sideColorClass}`}
            ></div>

            {/* card content */}
            <div className="relative z-10 p-4 pl-5 flex-1 flex flex-col text-slate-200">
                {/* Header */}
                <div className="mb-2">
                    <div className="flex justify-between items-start">
                        <h3
                            className="font-bold text-white text-lg line-clamp-1 leading-tight drop-shadow-md"
                            title={displayName}
                        >
                            {displayName}
                        </h3>
                        <span
                            className={`text-[10px] font-bold px-2 py-1 rounded uppercase backdrop-blur-sm ${badgeClass}`}
                        >
                            {entity.side}
                        </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 uppercase tracking-wider">
                        {entity.era}
                    </span>
                </div>

                {/* Body */}
                <div className="text-xs space-y-1.5 mt-auto bg-slate-900/60 p-3 rounded border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Name</span>
                        <span className="font-semibold text-slate-200">
                            {entity.name}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Form</span>
                        <span className="font-semibold text-slate-200">
                            {entity.combatStyle}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Midichlorian</span>
                        <span className="font-semibold text-white">
                            {entity.midichlorian.toLocaleString()}
                        </span>
                    </div>

                    <hr className="border-slate-700 my-1.5" />

                    {/* ข้อมูลแยกตามฝั่ง */}
                    {entity.side === "Jedi" ? (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Role</span>
                                <span className="font-semibold text-slate-200">
                                    {entity.jediRole}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Saber</span>
                                <span className="font-semibold text-slate-200">
                                    {entity.lightsaberColor}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Focus</span>
                                <span className="font-semibold text-red-400">
                                    {entity.sithRole}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">
                                    Dark Side
                                </span>
                                <span className="font-semibold text-red-400">
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
