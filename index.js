//repl.repl.ignoreUndefined=true;

const {InfluxDB, Point} = require('@influxdata/influxdb-client');

const token = "z8T764T7w4B5tUeJxnW38LvxLqSo0zMDf2MfKr-jmlUroE9VUH4ttra3dGpZfHW6oCAv3uekgCaoetz189gD-A==";
const url = 'https://us-west-2-1.aws.cloud2.influxdata.com/';

const client = new InfluxDB({url, token});

let org = `CIIOT`
let bucket = `helmut`

let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++) {
  let point = new Point('measurement1')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}