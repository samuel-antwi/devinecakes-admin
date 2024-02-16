-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paymentReference" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "customerId" UUID NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3),
    "deliveryMethod" TEXT,
    "orderStatus" TEXT,
    "description" TEXT,
    "quantity" TEXT,
    "cakeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "salutation" TEXT,
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "town" TEXT,
    "streetName" TEXT,
    "digitalAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
