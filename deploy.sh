# Exit immediately on error
set -e;

# Build files
npm i && gulp

# Sync to S3 server
s3cmd -P sync dist/* s3://www.akshayshekhawat.com --recursive
