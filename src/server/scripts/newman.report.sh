# api.test.sh
#!/bin/bash

newman run https://www.getpostman.com/collections/8c4f3dcff34a226e6cc4 \
  --environment 'newman/LOKETLA Environment.postman_environment.json' \
  --reporters cli,htmlextra \
  --suppress-exit-code \
  --reporter-htmlextra-export 'newman/report.html' \
