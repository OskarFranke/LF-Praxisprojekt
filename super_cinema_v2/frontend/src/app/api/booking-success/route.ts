import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // In a real application, we would save this to the database, 
        // potentially sending it back to TYPO3 or another microservice.
        console.log("================ NEW BOOKING ================");
        console.log(JSON.stringify(data, null, 2));
        console.log("=============================================");

        return NextResponse.json({ success: true, message: "Booking recorded successfully", data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }
}
