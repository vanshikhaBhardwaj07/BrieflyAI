import { getDbConnection } from "@/lib/db";

export async function createPayment({
  userId,
  orderId,
  amount,
}: {
  userId: string;
  orderId: string;
  amount: number;
}) {
  const sql = await getDbConnection();

  const [payment] = await sql`
    INSERT INTO payments (user_id, order_id, amount, status)
    VALUES (${userId}, ${orderId}, ${amount}, 'created')
    RETURNING id, order_id;
  `;

  return payment;
}

export async function markPaymentPaid({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId: string;
}) {
  const sql = await getDbConnection();

  await sql`
    UPDATE payments
    SET status = 'paid', payment_id = ${paymentId}
    WHERE order_id = ${orderId}
  `;
}

export async function markPaymentFailed(orderId: string) {
  const sql = await getDbConnection();

  await sql`
    UPDATE payments
    SET status = 'failed'
    WHERE order_id = ${orderId}
  `;
}
