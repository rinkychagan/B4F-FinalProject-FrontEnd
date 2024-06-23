import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";



export function decodeJWT() {
    const cookes =  cookies();
    const session = cookes.get("jwt")?.value || "";
    const decodedAccessToken: JwtPayload = jwtDecode(session);
    const role = decodedAccessToken.role;
    const userId = decodedAccessToken.id;
    return { role, userId };
}