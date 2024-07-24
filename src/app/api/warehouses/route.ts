import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
  // todo: check Auth
  const requestData = await request.json();

  let validateData;

  try {
    validateData = warehouseSchema.parse(requestData);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(warehouses).values(validateData);

    return Response.json(
      { message: "wherehouse data created" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "failed to store the warehouse" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allWarehouses = await db.select().from(warehouses);
    return Response.json(allWarehouses);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch all warehouses" },
      { status: 500 }
    );
  }
}
