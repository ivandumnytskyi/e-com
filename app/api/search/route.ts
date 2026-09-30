import { NextResponse } from "next/server";
import searchProducts from "@/lib/search/searchProsucts";

export async function GET(request: Request){
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await searchProducts(query);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product search failed:", error);
    return NextResponse.json(
      { error: "Product search failed" },
      { status: 500 },
    );
  }
}