export interface PositionConstraint {
    allowedMask: number;
}

export interface LetterConstraint {
    minOccurrences: number;
    maxOccurrences: number | null;
}

export interface Constraint {
    positions: PositionConstraint[];
    letters: LetterConstraint[];
}