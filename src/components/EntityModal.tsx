import type { ForceEntity } from "../types";

interface EntityModalProps {
    entity: ForceEntity | null;
    onClose: () => void;
}

export default function EntityModal({ entity, onClose }: EntityModalProps) {
    if (!entity) return null;

    const isSith = entity.side === "Sith";
    const displayName = isSith ? entity.darthTitle : entity.name;

    const defaultJediImage =
        "https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=800&auto=format&fit=crop";
    const defaultSithImage =
        "https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=80&w=800&auto=format&fit=crop";
    const imageToDisplay = entity.imageUrl
        ? entity.imageUrl
        : isSith
          ? defaultSithImage
          : defaultJediImage;

    const theme = isSith
        ? {
              glow: "shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]",
              accentBg: "bg-red-600",
              textPrimary: "text-red-500",
              panelBg: "bg-red-950/20",
              panelBorder: "border-red-900/50",
              badge: "bg-red-950 text-red-400 border-red-800",
          }
        : {
              glow: "shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)]",
              accentBg: "bg-sky-500",
              textPrimary: "text-sky-400",
              panelBg: "bg-sky-950/20",
              panelBorder: "border-sky-900/50",
              badge: "bg-sky-950 text-sky-400 border-sky-800",
          };

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-8 animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* main modal */}
            <div
                className={`flex flex-col md:flex-row bg-slate-950 w-full max-w-5xl md:h-138 max-h-[90vh] md:max-h-none rounded-2xl overflow-y-auto md:overflow-hidden relative ${theme.glow} border border-slate-800 transition-all`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 hover:scale-105 transition-all z-50"
                >
                    ✕
                </button>

                {/* === left-img === */}
                <div className="w-full md:w-5/12 h-[40vh] min-h-62 md:h-full md:min-h-0 relative bg-slate-900 shrink-0">
                    <img
                        src={imageToDisplay}
                        alt={displayName}
                        className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
                    />
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-1.5 md:h-full md:w-2 md:top-0 md:right-0 md:bottom-0 md:left-auto ${theme.accentBg}`}
                    ></div>
                </div>

                {/* right-info */}
                <div className="w-full md:w-7/12 p-4 md:p-10 flex flex-col justify-center relative">
                    <div className="mb-4 md:mb-8 mt-2 md:mt-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <span
                                className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded uppercase border ${theme.badge}`}
                            >
                                {entity.side}
                            </span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                                {entity.era}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight leading-none mb-1 md:mb-2 drop-shadow-md">
                            {displayName}
                        </h2>
                        <p
                            className={`text-sm md:text-lg font-medium ${theme.textPrimary}`}
                        >
                            {isSith ? entity.sithRole : entity.jediRole}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 pb-2 md:pb-0">
                        <div
                            className={`p-3 md:p-4 rounded-xl border ${theme.panelBorder} ${theme.panelBg} backdrop-blur-sm`}
                        >
                            <span className="block text-slate-500 text-[9px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1">
                                True Name
                            </span>
                            <span className="font-semibold text-slate-200 text-sm md:text-lg line-clamp-1">
                                {entity.name}
                            </span>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl border ${theme.panelBorder} ${theme.panelBg} backdrop-blur-sm`}
                        >
                            <span className="block text-slate-500 text-[9px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1">
                                Combat Form
                            </span>
                            <span className="font-semibold text-slate-200 text-sm md:text-lg line-clamp-1">
                                {entity.combatStyle}
                            </span>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl border ${theme.panelBorder} ${theme.panelBg} backdrop-blur-sm`}
                        >
                            <span className="block text-slate-500 text-[9px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1">
                                Midichlorian
                            </span>
                            <span className="font-black text-lg md:text-2xl text-white">
                                {entity.midichlorian.toLocaleString()}
                            </span>
                        </div>

                        <div
                            className={`p-3 md:p-4 rounded-xl border ${theme.panelBorder} ${theme.panelBg} backdrop-blur-sm`}
                        >
                            {entity.side === "Jedi" ? (
                                <>
                                    <span className="block text-slate-500 text-[9px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1">
                                        Kyber Crystal
                                    </span>
                                    <div className="flex items-center gap-1.5 md:gap-2 md:mt-1">
                                        <span
                                            className="w-3 h-3 md:w-4 md:h-4 shrink-0 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-white/20"
                                            style={{
                                                backgroundColor:
                                                    entity.lightsaberColor.toLowerCase(),
                                            }}
                                        ></span>
                                        <span className="font-semibold text-slate-200 text-sm md:text-lg">
                                            {entity.lightsaberColor}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="block text-slate-500 text-[9px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1">
                                        Dark Side
                                    </span>
                                    <span
                                        className={`font-black text-lg md:text-2xl ${theme.textPrimary}`}
                                    >
                                        {entity.corruptionLevel}%
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
