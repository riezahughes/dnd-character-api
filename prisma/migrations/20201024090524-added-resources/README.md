# Migration `20201024090524-added-resources`

This migration has been generated by DESKTOP-VN1U2BM\Dan at 10/24/2020, 10:05:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."CharacterSkills" DROP CONSTRAINT "CharacterSkills_characterId_fkey"

ALTER TABLE "public"."CharacterSkills" DROP CONSTRAINT "CharacterSkills_skillId_fkey"

ALTER TABLE "public"."Character" ADD COLUMN "deityId" integer   NOT NULL 

ALTER TABLE "public"."Deity" ADD COLUMN "alignment" text   ,
ADD COLUMN "domains" text   ,
ADD COLUMN "pantheon" text   ,
ADD COLUMN "province" text   ,
ADD COLUMN "symbol" text   ,
ADD COLUMN "description" text   

ALTER TABLE "public"."Equipment" ADD COLUMN "goldWorth" text   ,
ADD COLUMN "weight" text   

ALTER TABLE "public"."Skill" ADD COLUMN "statroll" text   

ALTER TABLE "public"."Spell" ADD COLUMN "level" integer   ,
ADD COLUMN "time" text   ,
ADD COLUMN "concentration" boolean   NOT NULL ,
ADD COLUMN "range" text   ,
ADD COLUMN "spellSchoolId" integer   ,
ADD COLUMN "dataResourceId" integer   

ALTER TABLE "public"."Trait" DROP COLUMN "level",
ADD COLUMN "raceId" integer   

CREATE TABLE "public"."CharacterFeat" (
"id" SERIAL,
"characterId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."CharacterSkill" (
"id" SERIAL,
"proficient" boolean   NOT NULL ,
"characterId" integer   NOT NULL ,
"skillId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."ClassFeature" (
"id" SERIAL,
"name" text   ,
"level" integer   ,
"description" text   ,
"classId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Condition" (
"id" SERIAL,
"type" text   ,
"name" text   ,
"description" text   ,
"vehicleId" integer   ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Background" (
"id" SERIAL,
"name" text   ,
"skillproficiencies" text   ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Language" (
"id" SERIAL,
"name" text   ,
"type" text   NOT NULL ,
"script" text   NOT NULL ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Feat" (
"id" SERIAL,
"name" text   ,
"ability" text   ,
"prerequisite" text   ,
"description" text   ,
"characterFeatId" integer   ,
"dataResourceId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."SpellSchool" (
"id" SERIAL,
"name" text   ,
"summary" text   ,
"description" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Psyonic" (
"id" SERIAL,
"name" text   ,
"type" text   ,
"order" text   NOT NULL ,
"description" text   ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."SupernaturalPassive" (
"id" SERIAL,
"type" text   ,
"name" text   ,
"description" text   ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Vehicle" (
"id" SERIAL,
"name" text   ,
"type" text   ,
"size" text   ,
"sizedimensions" text   ,
"creaturecapacity" text   ,
"cargocapacity" text   ,
"travelpace" text   ,
"speed" text   ,
"strength" integer   NOT NULL ,
"strengthmod" integer   NOT NULL ,
"dexterity" integer   NOT NULL ,
"dexteritymod" integer   NOT NULL ,
"constitution" integer   NOT NULL ,
"constitutionmod" integer   NOT NULL ,
"intelligence" integer   NOT NULL ,
"intelligencemod" integer   NOT NULL ,
"wisdom" integer   NOT NULL ,
"widsommod" integer   NOT NULL ,
"charisma" integer   NOT NULL ,
"charismamod" integer   NOT NULL ,
"damageimmunities" text   NOT NULL ,
"dataResourceId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."VehicleAction" (
"id" SERIAL,
"name" text   ,
"description" text   ,
"vehicleId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."CharacterFeat" ADD FOREIGN KEY ("characterId")REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CharacterSkill" ADD FOREIGN KEY ("characterId")REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CharacterSkill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."ClassFeature" ADD FOREIGN KEY ("classId")REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Condition" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Condition" ADD FOREIGN KEY ("vehicleId")REFERENCES "public"."Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Background" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Language" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Feat" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Feat" ADD FOREIGN KEY ("characterFeatId")REFERENCES "public"."CharacterFeat"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Psyonic" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."SupernaturalPassive" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vehicle" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."VehicleAction" ADD FOREIGN KEY ("vehicleId")REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Character" ADD FOREIGN KEY ("deityId")REFERENCES "public"."Deity"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Spell" ADD FOREIGN KEY ("spellSchoolId")REFERENCES "public"."SpellSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Spell" ADD FOREIGN KEY ("dataResourceId")REFERENCES "public"."DataResource"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Trait" ADD FOREIGN KEY ("raceId")REFERENCES "public"."Race"("id") ON DELETE SET NULL ON UPDATE CASCADE

DROP TABLE "public"."CharacterSkills"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201021223737-update-name..20201024090524-added-resources
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
@@ -44,38 +44,52 @@
   allies_org String
   backstory String
   treasure String
   equipment CharacterEquipment[]
+  feats CharacterFeat[]
+  skills CharacterSkill[]
+  spells CharacterSpells[]
+  diety Deity
 }
 model CharacterEquipment{
   id Int @default(autoincrement()) @id
   character Character
   item Equipment
 }
-model CharacterSkills{
+model CharacterSpells{
   id Int @default(autoincrement()) @id
   character Character
-  skill Skill
+  spell Spell
 }
-model CharacterSpells{
+model CharacterFeat{
   id Int @default(autoincrement()) @id
   character Character
-  spell Spell
+  feats Feat[]
 }
+model CharacterSkill{
+  id  Int @default(autoincrement()) @id
+  character Character
+  skill Skill
+  proficient Boolean
+}
+
 model Equipment{
   id  Int @default(autoincrement()) @id
   name String?
   type String?
+  goldWorth String?
+  weight String?
   description String?
 }
 model Race{
   id  Int @default(autoincrement()) @id
   name  String?
+  traits Trait[]
 }
 model Class{
   id  Int @default(autoincrement()) @id
@@ -84,9 +98,9 @@
   hpfirstlevel Int?
   hpperlevel Int?
   hpperlevel_roll Int?
   proficiencies Proficiency[]
-  traits Trait[]
+  classfeatures ClassFeature[]
   classresources ClassResource[]
 }
 model ClassResource{
@@ -96,28 +110,105 @@
   level Int?
   value String?
 }
+model ClassFeature{
+  id Int @default(autoincrement()) @id
+  class Class
+  name String?
+  level Int?
+  description String?
+}
+
 model SubClass{
   id  Int @default(autoincrement()) @id
   name String?
 }
 model Skill{
   id  Int @default(autoincrement()) @id
   name String?
+  statroll String?
 }
+model Condition{
+  id  Int @default(autoincrement()) @id
+  type String?
+  name String?
+  description String?
+  source DataResource
+}
+
+model Background{
+  id  Int @default(autoincrement()) @id
+  name String?
+  skillproficiencies String?
+  source DataResource
+}
+
+model Language{
+  id  Int @default(autoincrement()) @id
+  name String?
+  type String
+  script String
+  source DataResource
+}
+
+model Feat{
+  id  Int @default(autoincrement()) @id
+  name String?
+  ability String?
+  prerequisite String?
+  source DataResource?
+  description String?
+}
+
 model Spell{
   id  Int @default(autoincrement()) @id
   name String?
+  level Int?
+  time String?
+  school SpellSchool?
+  concentration Boolean
+  range String?
+  source DataResource?
 }
+model SpellSchool{
+  id  Int @default(autoincrement()) @id
+  name String?
+  summary String?
+  description String?
+}
+
+model Psyonic{
+  id  Int @default(autoincrement()) @id
+  name String?
+  type String?
+  order String
+  description String?
+  source DataResource
+}
+
 model Deity{
   id  Int @default(autoincrement()) @id
   name String?
+  alignment String?
+  domains String?
+  pantheon String?
+  province String?
+  symbol String?
+  description String?
 }
+model SupernaturalPassive{
+  id  Int @default(autoincrement()) @id
+  type String?
+  name String?
+  description String?
+  source DataResource
+}
+
 model Proficiency{
   id  Int @default(autoincrement()) @id
   name String?
 }
@@ -126,17 +217,51 @@
   id  Int @default(autoincrement()) @id
   name String?
   description String?
   class Class?
-  level Int
 }
 model DataResource{
   id Int @default(autoincrement()) @id
   name String?
   acronym String?
 }
+model Vehicle{
+  id  Int @default(autoincrement()) @id
+  name String?
+  type String?
+  size String?
+  sizedimensions String?
+  creaturecapacity String?
+  cargocapacity String?
+  travelpace String?
+  speed String?
+  strength Int
+  strengthmod Int
+  dexterity Int
+  dexteritymod Int
+  constitution Int
+  constitutionmod Int
+  intelligence Int
+  intelligencemod Int
+  wisdom Int
+  widsommod Int
+  charisma Int
+  charismamod Int
+  damageimmunities String
+  conditionimmunities Condition[]
+  vehicleactions VehicleAction[]
+  source DataResource
+}
+
+model VehicleAction{
+  id  Int @default(autoincrement()) @id
+  vehicle Vehicle
+  name String?
+  description String?
+}
+
 model DiceModifier{
   id  Int @default(autoincrement()) @id  
   name String?
   scope String?
```

