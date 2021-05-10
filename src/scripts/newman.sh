# api.test.sh
#!/bin/bash

newman run https://www.getpostman.com/collections/8c4f3dcff34a226e6cc4 \
  --environment 'config/postman/LOKETLA Environment.postman_environment.json' \
  --suppress-exit-code
