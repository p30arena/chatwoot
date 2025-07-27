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

---

## Analysis of License Reverting Mechanism

The mechanism responsible for reverting your license changes is primarily located in two files:

1.  **The Trigger**: [`enterprise/app/jobs/enterprise/internal/check_new_versions_job.rb`](enterprise/app/jobs/enterprise/internal/check_new_versions_job.rb)
    This is a scheduled job that runs periodically. Its purpose is to communicate with Chatwoot's servers to get the latest information about your installation, including the official pricing plan. The [`update_plan_info`](enterprise/app/jobs/enterprise/internal/check_new_versions_job.rb:10) method updates the local database with the plan information received from the server.

2.  **The Enforcer**: [`enterprise/app/services/internal/reconcile_plan_config_service.rb`](enterprise/app/services/internal/reconcile_plan_config_service.rb)
    This service is executed by the job mentioned above. Its [`perform`](enterprise/app/services/internal/reconcile_plan_config_service.rb:2) method contains the core logic for reverting your changes.

### Step-by-step Breakdown:

1.  The service checks the official pricing plan for your installation using [`ChatwootHub.pricing_plan`](enterprise/app/services/internal/reconcile_plan_config_service.rb:4).
2.  If the plan is identified as `community`, the service proceeds with the reset.
3.  The [`reconcile_premium_config`](enterprise/app/services/internal/reconcile_plan_config_service.rb:38) method is called. This method reads a configuration file named `premium_installation_config.yml`, which contains the default "community" values for settings like `BRAND_NAME`, `WIDGET_BRAND_URL`, etc. It then iterates through these settings and overwrites any custom values in your `installation_configs` table with these default values.
4.  Finally, the [`reconcile_premium_features`](enterprise/app/services/internal/reconcile_plan_config_service.rb:52) method is called to disable any enterprise-only features in your accounts.

In summary, the `Enterprise::Internal::CheckNewVersionsJob` periodically fetches your official license status, and if it's "community," the `Internal::ReconcilePlanConfigService` reverts your manual database changes to their default state. To prevent this, you would need to disable or modify the execution of this job or the logic within the service.
