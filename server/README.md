

# 查询本地d1的数据库
* npx wrangler d1 execute dev-edgejs --local --command="SELECT * FROM user"

# 执行sql语句
* npx wrangler d1 execute dev-edgejs --local --file=./src/db/data/admin.sql