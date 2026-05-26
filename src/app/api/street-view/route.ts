import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_MAPS_API_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!address && (!lat || !lng)) {
    return NextResponse.json({ error: "address or lat/lng required" }, { status: 400 });
  }

  const location = lat && lng ? `${lat},${lng}` : encodeURIComponent(address!);
  const googleUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${location}&key=${apiKey}`;

  const res = await fetch(googleUrl);
  if (!res.ok) {
    return NextResponse.json({ error: "Street view fetch failed" }, { status: res.status });
  }

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
