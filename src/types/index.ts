export type ForceSide = "Jedi" | "Sith";
export type EraType =
    | "Old Republic"
    | "High Republic"
    | "Prequel"
    | "Original"
    | "Sequel"
    | "All";
export type SortOption = "mCountDesc" | "mCountAsc" | "nameAsc";

export interface BaseEntity {
    id: string;
    name: string;
    era: EraType;
    combatStyle: string;
    midichlorian: number;
    imageUrl?: string;
}

export interface JediEntity extends BaseEntity {
    side: "Jedi";
    jediRole: string;
    lightsaberColor: string;
}

export interface SithEntity extends BaseEntity {
    side: "Sith";
    darthTitle: string;
    sithRole: string;
    corruptionLevel: number;
}

export type ForceEntity = JediEntity | SithEntity;
