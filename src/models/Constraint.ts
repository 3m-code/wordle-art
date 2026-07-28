export interface PositionConstraint {
    allowed_mask: number;
    required_letter?: string;
}

export interface LetterConstraint {
    min_occurrences: number;
    max_occurrences: number | null;
}

export interface Constraint {
    positions: PositionConstraint[];
    letters: LetterConstraint[];
}