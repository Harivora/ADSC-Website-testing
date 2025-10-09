export interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: string;
    img: string;
    socialLinks?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
    expertise?: string[];
    bio?: string;
    bgGradientColor: string;
}
