nconf = require("nconf")
analytics = require("analytics-node")

env = process.env.NODE_ENV or "development"

nconf.use("memory")
  .argv()
  .env()
  .file({file: "config.#{env}.json"})
  .defaults({
    port: 8080
  })

analytics.init(config) if config = nconf.get("analytics")

unless host = nconf.get("host")
  console.error "The 'host' option is required for Plunker to run."
  process.exit(1)
