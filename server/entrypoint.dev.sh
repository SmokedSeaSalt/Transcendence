#!/bin/sh
npx prisma generate
npx prisma migrate deploy
npx tsx watch src/index.ts