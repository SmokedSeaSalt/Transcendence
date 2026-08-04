#docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres #launch database
export TEST_DATABASE_URL="postgresql://user:pass@localhost:5432/testdb"

cd server
npm run test

#post test delete the testdb