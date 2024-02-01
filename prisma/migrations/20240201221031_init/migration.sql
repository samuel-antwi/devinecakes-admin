-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "streetName" TEXT,
    "digitalAddress" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paymentReference" INTEGER,
    "paymentStatus" TEXT,
    "orderNumber" TEXT NOT NULL,
    "customerId" UUID NOT NULL,
    "orderDate" TIMESTAMPTZ(6) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "deliveryStatus" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "description" TEXT,
    "cakeType" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
