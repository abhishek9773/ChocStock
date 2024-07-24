import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validatedData;
  try {
    validatedData = inventoriesSchema.parse(requestData);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(inventories).values(validatedData);
    return Response.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "failed to store inventory info to db" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        products: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouse_id, warehouses.id))
      .leftJoin(products, eq(inventories.product_id, products.id))
      .orderBy(desc(inventories.id));
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: "failed to fetch data from db" },
      { status: 500 }
    );
  }
}
