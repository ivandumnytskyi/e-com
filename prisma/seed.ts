import prisma from "@/lib/prisma"

async function main() {
  const response = await fetch('https://dummyjson.com/products?limit=0')
  const data = await response.json()
  
}

main()