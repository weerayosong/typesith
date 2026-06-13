import type { ForceEntity } from "../types";

interface EntityModalProps {
    entity: ForceEntity | null; // ถ้ารับ null มา แปลว่าให้ปิด Modal
    onClose: () => void;
}

export default function EntityModal({ entity, onClose }: EntityModalProps) {
    // ถ้าไม่มีตัวละครถูกเลือกอยู่ ก็ไม่ต้อง render อะไรเลย
    if (!entity) return null;

    const isSith = entity.side === "Sith";
    const displayName = isSith ? entity.darthTitle : entity.name;

    return (
        // backdropดำโปร่งใส.6
        <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={onClose} // คลิก anywhere เพื่อปิด
        >
            {/* modalกลาง */}
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // คลิกในกล่อง modal ไม่ปิด
            >
                {/* modal header สีตามฝั่ง */}
                <div
                    className={`p-6 text-white ${isSith ? "bg-red-700" : "bg-slate-700"} relative`}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition"
                    >
                        ✕
                    </button>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                        {entity.era}
                    </span>
                    <h2 className="text-3xl font-extrabold mt-1">
                        {displayName}
                    </h2>
                    <p className="opacity-90 mt-1">
                        {isSith ? entity.sithRole : entity.jediRole}
                    </p>
                </div>

                {/* modal content */}
                <div className="p-6 space-y-4 text-slate-700">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-1 mb-2">
                            Combat Profile
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-slate-500 text-xs">
                                    Primary Name
                                </span>
                                <span className="font-semibold">
                                    {entity.name}
                                </span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs">
                                    Lightsaber Form
                                </span>
                                <span className="font-semibold">
                                    {entity.combatStyle}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-1 mb-2">
                            Force Connection
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-slate-500 text-xs">
                                    Midichlorian Count
                                </span>
                                <span className="font-bold text-lg">
                                    {entity.midichlorian.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                {entity.side === "Jedi" ? (
                                    <>
                                        <span className="block text-slate-500 text-xs">
                                            Lightsaber Color
                                        </span>
                                        <span className="font-semibold">
                                            {entity.lightsaberColor}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="block text-slate-500 text-xs">
                                            Corruption Level
                                        </span>
                                        <span className="font-semibold text-red-600">
                                            {entity.corruptionLevel}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
