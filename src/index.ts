import { Hono } from 'hono'
import { influxLogger } from './influxdb.ts'

const app = new Hono()

app.use('/', influxLogger())

app.get('/', (c) => {
	let url = c.req.query('redirect')
	// Header may not contain more than a single header, new line detected
	url.replaceAll('\r','').replaceAll('\n','').replaceAll('%0A','');

	// https://developer.mozilla.org/en-US/docs/Web/API/URL
    const parsedUrl = new URL(url);

    parsedUrl.search = ""; //Remove any params
    // let redirectUrl = parsedUrl.href+='?from=redirect'
	return c.redirect(parsedUrl.href)
})

app.get('/ip', (c) => {
	return c.text("ip:"+c.req.header('x-real-ip'))
})

export default app
