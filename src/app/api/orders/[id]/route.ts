import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";

// PATCH : Modifier le statut d'un pedido
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    await db.update(orders).set({ status }).where(eq(orders.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el estado" }, { status: 500 });
  }
}

// DELETE : Supprimer un pedido (les articles sauteront automatiquement grâce au ON DELETE CASCADE)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.delete(orders).where(eq(orders.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar el pedido" }, { status: 500 });
  }
}