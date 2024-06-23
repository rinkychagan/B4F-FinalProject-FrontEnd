import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Retrieve the JWT token from cookies
        const session = req.cookies.get("jwt")?.value ;
        console.log("session::: from function ", session);
        

        // Check if the token is present
        if (!session) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        // Try decoding the token
        let decodedAccessToken: JwtPayload;
        try {
            decodedAccessToken = jwtDecode(session);
        } catch (error) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Return the decoded token as JSON
        return NextResponse.json(decodedAccessToken);

    } catch (error) {
        // Handle any other unexpected errors
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}


// export async function GET(req: NextRequest) {
//     return NextResponse.json({
//         message: "Hello World",
//     });
// }   
