export interface IPokemon {
    count: number;
    previous?: string;
    results: ResultsObject;
    next: string;
}

export interface ResultsObject {
    url: string;
    name: string;
}