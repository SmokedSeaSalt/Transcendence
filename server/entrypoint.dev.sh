#!/bin/sh
npx prisma migrate deploy
npx tsx watch src/index.ts