# Migration `20201025122932-traitchange`

This migration has been generated by DESKTOP-VN1U2BM\Dan at 10/25/2020, 12:29:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SubClass" ADD COLUMN "classId" integer   

ALTER TABLE "public"."SubClass" ADD FOREIGN KEY ("classId")REFERENCES "public"."Class"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201025114846-traitchange..20201025122932-traitchange
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -121,8 +121,9 @@
 model SubClass{
   id  Int @default(autoincrement()) @id
   name String?
+  class Class?
 }
 model Skill{
   id  Int @default(autoincrement()) @id
```


