import app from '../hono/hono';
import result from '../model/result';
import publicService from '../service/public-service';

import emailService from '../service/email-service';




app.post('/public/genToken', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});

app.post('/public/genToken2', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});


app.post('/public/emailList', async (c) => {
	const list = await publicService.emailList(c, await c.req.json());
	return c.json(result.ok(list));
});

app.post('/public/addUser', async (c) => {
	await publicService.addUser(c, await c.req.json());
	return c.json(result.ok());
});

// 新增以下代码（物理删除邮件的公开API）
app.post('/public/deleteEmail', async (c) => {
	await publicService.physicsDelete(c, await c.req.json());
	// result.ok()：包装成功结果
	return c.json(result.ok());
});
