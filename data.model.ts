// Generated by https://quicktype.io

export interface JSON {
    technologies: Technology[];
    courses:      JSONCourse[];
}

export interface JSONCourse {
    _id:  string;
    code: string;
    name: string;
}

export interface Technology {
    _id:         string;
    name:        string;
    description: string;
    difficulty:  number;
    courses:     TechnologyCourse[];
}

export interface TechnologyCourse {
    code: string;
    name: string;
}
