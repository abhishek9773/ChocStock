import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersionSchema } from "@/lib/validators/deliveryPersionSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validateData;
  try {
    validateData = deliveryPersionSchema.parse(requestData);
  } catch (error) {
    return Response.json(
      { message: `${error} - error during validateData` },
      { status: 400 }
    );
  }

  try {
    await db.insert(deliveryPersons).values(validateData);
    return Response.json({ message: `ok- ${validateData}` }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "failed to store the delivery persion info to database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const alldeliveryPerson = await db
      .select({
        id: deliveryPersons.id,
        name: deliveryPersons.name,
        phone: deliveryPersons.phone,
        warehouse: warehouses.name,
      })
      .from(deliveryPersons)
      .leftJoin(warehouses, eq(deliveryPersons.warehouse_id, warehouses.id))
      .orderBy(desc(deliveryPersons.id));
    return Response.json(alldeliveryPerson);
  } catch (error) {
    return Response.json(
      { message: "no develivery persion found" },
      { status: 500 }
    );
  }
}
