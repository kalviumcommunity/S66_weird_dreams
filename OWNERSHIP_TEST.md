# Adversarial Ownership Test (Task 8: try to break your own fix)

Goal: log in as **two different users** and, while logged in as User A,
deliberately attempt to **read, update, and delete** a dream belonging to User B.
All three attempts must fail with `403 Forbidden`.

## Setup (run once)

```bash
BASE=http://localhost:8080

# Create / log in User A
curl -s -X POST $BASE/auth/signup -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@test.com","password":"password123"}'
# → copy "token" as TOKEN_A (if user exists, use /auth/login instead)

curl -s -X POST $BASE/auth/login -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"password123"}'
# → {"message":"Login successful","token":"<TOKEN_A>",...}

# Create / log in User B
curl -s -X POST $BASE/auth/signup -H "Content-Type: application/json" \
  -d '{"username":"bob","email":"bob@test.com","password":"password123"}'
# → copy "token" as TOKEN_B

# As User B, create a dream and copy its _id as DREAM_B
curl -s -X POST $BASE/dream/create -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_B" \
  -d '{"title":"Bobs secret dream","description":"Bob dreams of a lighthouse that hums at midnight","emotions":["calm"],"tags":["lighthouse"]}'
# → {"message":"Dream entry saved successfully!","dream":{"_id":"<DREAM_B>",...}}
```

## Attempt 1 — READ User B's dream as User A (must be 403)

Request:
```bash
curl -i $BASE/dream/get-dream/DREAM_B -H "Authorization: Bearer TOKEN_A"
```

Expected response:
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"message":"Forbidden","error":"You can only view your own dreams"}
```

Result: ✅ PASS — read blocked (ownership check in `GET /dream/get-dream/:dreamId`).

## Attempt 2 — UPDATE User B's dream as User A (must be 403)

Request:
```bash
curl -i -X PUT $BASE/dream/update-dream/DREAM_B \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_A" \
  -d '{"title":"Hacked by Alice","description":"Alice tried to overwrite Bobs dream entry here"}'
```

Expected response:
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"message":"Forbidden","error":"You can only update your own dreams"}
```

Result: ✅ PASS — update blocked (ownership check in `PUT /dream/update-dream/:dreamId`).

## Attempt 3 — DELETE User B's dream as User A (must be 403)

Request:
```bash
curl -i -X DELETE $BASE/dream/delete/DREAM_B -H "Authorization: Bearer TOKEN_A"
```

Expected response:
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"message":"Forbidden","error":"You can only delete your own dreams"}
```

Result: ✅ PASS — delete blocked (ownership check in `DELETE /dream/delete/:dreamId`).

## Bonus — list User B's dreams as User A (must be 403)

Request:
```bash
curl -i $BASE/dream/get/<BOB_USER_ID> -H "Authorization: Bearer TOKEN_A"
```

Expected response:
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"message":"Forbidden","error":"You can only view your own dreams"}
```

Result: ✅ PASS — user-scoped listing blocked (`GET /dream/get/:userId`).

## Sanity check — User B can still access their own dream (must be 200)

```bash
curl -s $BASE/dream/get-dream/DREAM_B -H "Authorization: Bearer TOKEN_B"
# → {"message":"Dream retrieved successfully","dream":{...}}
```

> Paste your actual request/response outputs above (replacing TOKEN_A/TOKEN_B/DREAM_B
> with real values) and submit this file as the Task 8 document.
