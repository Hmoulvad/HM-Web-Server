import { Role } from "./models";

interface ITokenData {
    id: string;
    role: Role;
}

export interface IToken {
    data: ITokenData;
    exp: number;
    iat: number;
}
