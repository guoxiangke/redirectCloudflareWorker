import { env } from 'hono/adapter'

async function call(data, org, bucket, token) {
    const url = 'https://us-east-1-1.aws.cloud2.influxdata.com/api/v2/write?org='+org+'&bucket='+bucket+'&precision=ns';
    const headers = {
      'Authorization': 'Token '+token,
      'Content-Type': 'text/plain; charset=utf-8',
      'Accept': 'application/json',
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data,
    })
}

var influxLogger = (fn = console.log) => {
  return async (c, next) => {
    await next()
    let url = c.req.query('redirect')
    // Header may not contain more than a single header, new line detected
    url.replaceAll('\r','').replaceAll('\n','').replaceAll('%0A','');

    // cf-connecting-ip
    const ip = c.req.header('x-real-ip')

    // https://developer.mozilla.org/en-US/docs/Web/API/URL
    const parsedUrl = new URL(url);
    const target = basename(parsedUrl.pathname) ////cc201221.mp3
    const host = parsedUrl.hostname;
    const fields = 'count=1i,target="'+target + '"'+',ip="'+ip+ '"'
    const tags = parsedUrl.searchParams // bot=4
    // .replaceAll('%40','@') => decodeURIComponent
    const metricName = c.env.INFLUXDB_MEASUREMENT_NAME //click or clicks
    const data = metricName + "," + decodeURIComponent(tags.toString()).replaceAll('&',',') + " " + fields.replaceAll('&',',');
return console.log(data);
    const org = c.env.INFLUXDB_ORG
    const bucket = c.env.INFLUXDB_BUCKET
    const token = c.env.INFLUXDB_TOKEN

    await call(data, org, bucket, token)
  };
};

// https://www.abeautifulsite.net/posts/javascript-functions-for-basename-and-dirname/
function basename(path) {
  return path.replace(/.*\//, '');
}

export {
  influxLogger
};