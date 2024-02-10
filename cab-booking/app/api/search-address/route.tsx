import { NextResponse } from "next/server";

export async function GET(request: any) {

    const baseUrl = "https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}"
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("q");
    const res = await fetch(baseUrl + "/?q=" + searchText + "?language=en&limit=1&session_token=[balaji.kolisetty@gmail.com]&proximity=-83.748708,42.265837&country=US&access_token=pk.eyJ1IjoiYmFsYWppNyIsImEiOiJjbHM1eTBnZXkxcThsMmxtdTE2MXlzZWc3In0.Vpj5ftDPIQQYaAqN7rHE-g" + "&access_token=" + process.env.MAPBOX_ACCESS_TOKEN,
        {
            headers: {
                "Content-Type": "application/json"
            }
        });

    const searchResult = await res.json();
    return NextResponse.json({ searchResult });
}
