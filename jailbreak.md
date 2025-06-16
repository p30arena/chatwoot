"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: community\n"
"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: 0\n"
SELECT * FROM installation_configs WHERE name = 'INSTALLATION_PRICING_PLAN';
SELECT * FROM installation_configs WHERE name = 'INSTALLATION_PRICING_PLAN_QUANTITY';

```
UPDATE installation_configs SET serialized_value = '"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: premium\n"' WHERE name = 'INSTALLATION_PRICING_PLAN';

UPDATE installation_configs SET serialized_value = '"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: 1000000\n"' WHERE name = 'INSTALLATION_PRICING_PLAN_QUANTITY';

UPDATE installation_configs SET serialized_value = '"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: TikoChat\n"' WHERE name = 'BRAND_NAME';

UPDATE installation_configs SET serialized_value = '"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: https://www.tikochat.com\n"' WHERE name = 'WIDGET_BRAND_URL';

UPDATE installation_configs SET serialized_value = '"--- !ruby/hash:ActiveSupport::HashWithIndifferentAccess\nvalue: https://www.tikochat.com\n"' WHERE name = 'BRAND_URL';
```

LOGO_THUMBNAIL
LOGO
LOGO_DARK
BRAND_URL
WIDGET_BRAND_URL
BRAND_NAME

```
docker exec -it 7f53abf08596ec3dc33ecedbfe66bbcd53aec80d71294943a15ff56ffd4c290e psql -U postgres

docker exec -t 2dcf8fef5bb822bbb9a5fdd94d49efb43345d5725158d8b16d23a78da6b613ea redis-cli flushall
```
